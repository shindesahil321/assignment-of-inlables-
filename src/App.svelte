<script lang="ts">
  import { onMount } from 'svelte';
  import { notes, isLoading, error, filteredNotes } from './stores/notes';
  import { notesApi } from './services/api';
  import type { Note, CreateNoteRequest } from './types/note';

  import SearchBar from './components/SearchBar.svelte';
  import NoteCard from './components/NoteCard.svelte';
  import NoteForm from './components/NoteForm.svelte';
  import Modal from './components/Modal.svelte';
  import ConfirmDialog from './components/ConfirmDialog.svelte';
  import EmptyState from './components/EmptyState.svelte';
  import LoadingSpinner from './components/LoadingSpinner.svelte';

  let showCreateModal = false;
  let showEditModal = false;
  let showDeleteDialog = false;
  let editingNote: Note | null = null;
  let deletingNote: Note | null = null;
  let isSubmitting = false;

  let isDarkMode = false;

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }

  onMount(async () => {
    const savedMode = localStorage.getItem('theme');
    isDarkMode = savedMode === 'dark';
    document.documentElement.classList.toggle('dark', isDarkMode);
    await loadNotes();
  });

  async function loadNotes() {
    isLoading.set(true);
    error.set(null);
    try {
      const data = await notesApi.getNotes();
      notes.set(data);
    } catch (err) {
      error.set('Failed to load notes. Please try again.');
    } finally {
      isLoading.set(false);
    }
  }

  async function handleCreateNote(event: CustomEvent<CreateNoteRequest>) {
    isSubmitting = true;
    try {
      const newNote = await notesApi.createNote(event.detail);
      notes.update(current => [newNote, ...current]);
      showCreateModal = false;
    } catch {
      error.set('Failed to create note. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  async function handleUpdateNote(event: CustomEvent<CreateNoteRequest>) {
    if (!editingNote) return;
    isSubmitting = true;
    try {
      const updatedNote = await notesApi.updateNote(editingNote.id, event.detail);
      notes.update(current =>
        current.map(note => note.id === editingNote.id ? updatedNote : note)
      );
      showEditModal = false;
      editingNote = null;
    } catch {
      error.set('Failed to update note. Please try again.');
    } finally {
      isSubmitting = false;
    }
  }

  async function handleDeleteNote() {
    if (!deletingNote) return;
    try {
      await notesApi.deleteNote(deletingNote.id);
      notes.update(current => current.filter(note => note.id !== deletingNote.id));
      showDeleteDialog = false;
      deletingNote = null;
    } catch {
      error.set('Failed to delete note. Please try again.');
    }
  }

  function openCreateModal() {
    showCreateModal = true;
  }

  function openEditModal(event: CustomEvent<Note>) {
    editingNote = event.detail;
    showEditModal = true;
  }

  function openDeleteDialog(event: CustomEvent<Note>) {
    deletingNote = event.detail;
    showDeleteDialog = true;
  }

  function closeCreateModal() {
    showCreateModal = false;
  }

  function closeEditModal() {
    showEditModal = false;
    editingNote = null;
  }

  function closeDeleteDialog() {
    showDeleteDialog = false;
    deletingNote = null;
  }
</script>

<main class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

    <!-- Dark Mode Toggle -->
    <div class="flex justify-end mb-4">
      <button
        on:click={toggleDarkMode}
        class="px-3 py-1 rounded bg-emerald-200 dark:bg-gray-800 text-emerald-900 dark:text-white shadow"
      >
        {isDarkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>

    <!-- Header -->
    <div class="flex flex-col items-center text-center space-y-2 mb-10">
      <h1 class="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400">My Notes</h1>
      <p class="text-emerald-600 dark:text-emerald-300 text-lg">Great ideas often start as quick notes</p>
    </div>

    <!-- Search and Button -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
      <div class="w-full sm:w-auto max-w-md">
        <SearchBar />
      </div>

      <button
        on:click={openCreateModal}
        class="btn-primary w-full sm:w-auto flex justify-center"
      >
        <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Note
      </button>
    </div>

    <!-- Error Message -->
    {#if $error}
      <div class="mb-6 bg-red-100 dark:bg-red-800 border border-red-300 dark:border-red-600 text-red-800 dark:text-red-100 px-4 py-3 rounded-lg">
        <div class="flex items-center justify-between">
          <span>{$error}</span>
          <button class="ml-4 underline text-sm" on:click={() => error.set(null)}>Dismiss</button>
        </div>
      </div>
    {/if}

    <!-- Notes Display -->
    {#if $isLoading}
      <div class="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    {:else if $filteredNotes.length === 0}
      <EmptyState
        title={$notes.length === 0 ? "No notes yet" : "No notes found"}
        description={$notes.length === 0 ? "Create your first note to get started!" : "Try adjusting your search terms."}
        actionText={$notes.length === 0 ? "Create your first note" : ""}
        showAction={$notes.length === 0}
        on:action={openCreateModal}
      />
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each $filteredNotes as note (note.id)}
          <NoteCard
            {note}
            on:edit={openEditModal}
            on:delete={openDeleteDialog}
          />
        {/each}
      </div>
    {/if}
  </div>

  <!-- Modals -->
  <Modal isOpen={showCreateModal} title="Create New Note" on:close={closeCreateModal}>
    <NoteForm {isSubmitting} on:submit={handleCreateNote} on:cancel={closeCreateModal} />
  </Modal>

  <Modal isOpen={showEditModal} title="Edit Note" on:close={closeEditModal}>
    <NoteForm note={editingNote} {isSubmitting} on:submit={handleUpdateNote} on:cancel={closeEditModal} />
  </Modal>

  <ConfirmDialog
    isOpen={showDeleteDialog}
    title="Delete Note"
    message="Are you sure you want to delete '{deletingNote?.title}'? This action cannot be undone."
    confirmText="Delete"
    cancelText="Cancel"
    isDestructive={true}
    on:confirm={handleDeleteNote}
    on:cancel={closeDeleteDialog}
  />
</main>

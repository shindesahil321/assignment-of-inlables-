<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Note } from '../types/note';

  export let note: Note;

  const dispatch = createEventDispatcher<{
    edit: Note;
    delete: Note;
  }>();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function handleEdit() {
    dispatch('edit', note);
  }

  function handleDelete() {
    dispatch('delete', note);
  }
</script>

<div class="card group animate-fade-in">
  <div class="flex justify-between items-start mb-3">
    <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
      {note.title}
    </h3>
    
    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        on:click={handleEdit}
        class="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        title="Edit note"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      
      <button
        on:click={handleDelete}
        class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete note"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>

  <p class="text-gray-600 mb-4 line-clamp-3">
    {note.content}
  </p>

  <div class="text-sm text-gray-400">
    {formatDate(note.createdAt)}
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Note, CreateNoteRequest } from '../types/note';

  export let note: Note | null = null;
  export let isSubmitting = false;

  const dispatch = createEventDispatcher<{
    submit: CreateNoteRequest;
    cancel: void;
  }>();

  let title = note?.title || '';
  let content = note?.content || '';

  function handleSubmit() {
    if (!title.trim() || !content.trim()) return;
    
    dispatch('submit', {
      title: title.trim(),
      content: content.trim(),
    });
  }

  function handleCancel() {
    dispatch('cancel');
  }

  $: isValid = title.trim() && content.trim();
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <div>
    <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
      Title
    </label>
    <input
      id="title"
      type="text"
      bind:value={title}
      placeholder="Enter note title..."
      class="input"
      disabled={isSubmitting}
      required
    />
  </div>

  <div>
    <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
      Content
    </label>
    <textarea
      id="content"
      bind:value={content}
      placeholder="Write your note content here..."
      rows="4"
      class="textarea"
      disabled={isSubmitting}
      required
    ></textarea>
  </div>

  <div class="flex gap-3 pt-2">
    <button
      type="submit"
      disabled={!isValid || isSubmitting}
      class="btn-primary"
    >
      {#if isSubmitting}
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {note ? 'Updating...' : 'Creating...'}
      {:else}
        {note ? 'Update Note' : 'Create Note'}
      {/if}
    </button>
    
    <button
      type="button"
      on:click={handleCancel}
      disabled={isSubmitting}
      class="btn-secondary"
    >
      Cancel
    </button>
  </div>
</form>
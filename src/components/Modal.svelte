<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let isOpen = false;
  export let title = '';

  const dispatch = createEventDispatcher<{
    close: void;
  }>();

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      dispatch('close');
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      dispatch('close');
    }
  }
</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in"
    on:click={handleBackdropClick}
    on:keydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 id="modal-title" class="text-lg font-semibold text-gray-900">
          {title}
        </h2>
        <button
          on:click={() => dispatch('close')}
          class="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <slot />
      </div>
    </div>
  </div>
{/if}
<script lang="ts">
  export let title = 'No items found';
  export let description = '';
  export let actionText = '';
  export let showAction = false;

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    action: void;
  }>();

  function handleAction() {
    dispatch('action');
  }
</script>

<div class="text-center py-12">
  <div class="mx-auto h-24 w-24 text-gray-300 mb-4">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="h-full w-full">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
  
  <h3 class="text-lg font-medium text-gray-900 mb-2">
    {title}
  </h3>
  
  {#if description}
    <p class="text-gray-500 mb-6 max-w-sm mx-auto">
      {description}
    </p>
  {/if}
  
  {#if showAction && actionText}
    <button
      on:click={handleAction}
      class="btn-primary"
    >
      {actionText}
    </button>
  {/if}
</div>
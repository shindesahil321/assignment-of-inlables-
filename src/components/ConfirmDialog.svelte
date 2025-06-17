<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';

  export let isOpen = false;
  export let title = 'Confirm Action';
  export let message = 'Are you sure you want to proceed?';
  export let confirmText = 'Confirm';
  export let cancelText = 'Cancel';
  export let isDestructive = false;

  const dispatch = createEventDispatcher<{
    confirm: void;
    cancel: void;
  }>();

  function handleConfirm() {
    dispatch('confirm');
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<Modal {isOpen} {title} on:close={handleCancel}>
  <div class="space-y-4">
    <p class="text-gray-600">
      {message}
    </p>
    
    <div class="flex gap-3 pt-2">
      <button
        on:click={handleConfirm}
        class={isDestructive ? 'btn-danger' : 'btn-primary'}
      >
        {confirmText}
      </button>
      
      <button
        on:click={handleCancel}
        class="btn-secondary"
      >
        {cancelText}
      </button>
    </div>
  </div>
</Modal>
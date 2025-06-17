<script lang="ts">
  import { searchQuery } from '../stores/notes';

  let inputValue = '';

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    inputValue = target.value;
    searchQuery.set(inputValue);
  }

  function clearSearch() {
    inputValue = '';
    searchQuery.set('');
  }
</script>

<div class="relative">
  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
  
  <input
    type="text"
    bind:value={inputValue}
    on:input={handleInput}
    placeholder="Search notes..."
    class="input pl-10 pr-10"
  />
  
  {#if inputValue}
    <button
      on:click={clearSearch}
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  {/if}
</div>
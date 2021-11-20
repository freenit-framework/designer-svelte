<script lang="ts">
  import { dndzone } from 'svelte-dnd-action'
  import { design, rearrange } from '$lib/store'
  import TreeItem from './TreeItem.svelte'

  function handleDnd(event) {
    $design = event.detail.items
  }
</script>

{#if $rearrange}
  <div
    class="root"
    on:consider={handleDnd}
    on:finalize={handleDnd}
    use:dndzone={{ items: $design }}
  >
    {#each $design as data (data.id)}
      <TreeItem bind:data />
    {/each}
  </div>
{:else}
  <div class="root">
    {#each $design as data (data.id)}
      <TreeItem bind:data />
    {/each}
  </div>
{/if}

<style>
  .root {
    height: 100%;
    width: 100%;
    margin: 10px;
    overflow: auto;
    padding-right: 10px;
  }
</style>

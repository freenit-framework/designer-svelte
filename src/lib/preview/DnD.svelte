<script lang="ts">
  import { dndzone } from 'svelte-dnd-action'
  import { design, rearrange } from '$lib/store'
  import Component from './Component.svelte'

  function handleDnd(event) {
    $design = event.detail.items
  }
</script>

{#if $rearrange}
  <section class="root">
    {#each $design as item (item.id)}
      <Component bind:item />
    {/each}
  </section>
{:else}
  <section
    class="root"
    use:dndzone={{ items: $design }}
    on:consider={handleDnd}
    on:finalize={handleDnd}
  >
    {#each $design as item (item.id)}
      <Component bind:item />
    {/each}
  </section>
{/if}

<style>
  .root {
    flex: 1;
    overflow: auto;
    width: 100%;
    height: 100%;
  }
</style>

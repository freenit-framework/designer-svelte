<script lang="ts">
  import { dndzone } from 'svelte-dnd-action'
  import { design } from '$lib/store'
  import Component from './Component.svelte'

  function handleDnd(event) {
    $design = event.detail.items
  }
</script>

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

<style>
  .root {
    flex: 1;
    overflow: auto;
    width: 100%;
    height: 100%;
  }
</style>

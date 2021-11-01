<script lang="ts">
  import { design } from '$lib/store'
  import TreeItem from './TreeItem.svelte'

  function handleDnd(event) {
    $design = event.detail.items
  }
</script>

<div class="root" on:consider={handleDnd} on:finalize={handleDnd}>
  {#each $design as data (data.id)}
    <TreeItem bind:data />
  {/each}
</div>

<style>
  .root {
    height: 100%;
    width: 100%;
    margin: 10px;
    overflow: auto;
    padding-right: 10px;
  }
</style>

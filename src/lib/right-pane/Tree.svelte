<script lang="ts">
  import { design } from '$lib/store'
  import { drop } from '$lib/utils'
  import TreeItem from './TreeItem.svelte'
</script>

<div class="root" on:drop={drop($design)} ondragover="return false">
  {#each $design.children as item, index (item.id)}
    <TreeItem bind:data={item} bind:parent={$design} {index} />
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

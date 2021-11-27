<script lang="ts">
  import { SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action'
  import { design, selected } from '$lib/store'

  export let data = {
    id: null,
    name: '',
    children: [],
  }
  export let parent = {
    children: $design,
  }
  let hidden = true
  $: outline = $selected && $selected.id === data.id
  $: icon = hidden ? 'v' : 'A'

  function toggleOpen() {
    hidden = !hidden
  }

  function select() {
    $selected = data
  }

  function remove() {
    if ($selected.id === data.id) {
      $selected = { id: null }
    }
    if (parent.children === $design) {
      $design = $design.filter((item) => item.id !== data.id)
    } else {
      parent.children = parent.children.filter((item) => item.id !== data.id)
    }
  }
</script>

<div class="root" on:click|stopPropagation={select} class:outline>
  <div class="bar">
    <div class="titles">
      <div>{data.name.toLowerCase()}</div>
      <div class="subtitle">{data.id}</div>
    </div>
    <div class="action" on:click={remove}>x</div>
    <div class="action" on:click={toggleOpen}>{icon}</div>
  </div>
  <div class="content" class:hidden>
    {#each data.children.filter((item) => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item (item.id)}
      <svelte:self bind:data={item} bind:parent={data} />
    {/each}
  </div>
</div>

<style>
  .root {
    margin-left: 10px;
    width: calc(100% - 10px);
    background-color: #8881;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }

  .bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
  }

  .titles {
    flex: 1;
  }

  .subtitle {
    color: #777;
  }

  .action {
    margin-right: 10px;
  }

  .content {
    width: 100%;
    overflow: hidden;
  }

  .hidden {
    max-height: 0;
  }

  .outline {
    border-width: 1px;
    border-color: black;
    border-style: dotted;
  }
</style>

<script lang="ts">
  import { selected } from '$lib/store'

  export let data = {}
  let hidden = true
  $: outline = $selected && $selected.id === data.id
  $: icon = hidden ? 'v' : 'A'

  function toggleOpen() {
    hidden = !hidden
  }

  function select() {
    $selected = data
  }
</script>

{#if !data.id.startsWith('id:dnd-shadow-placeholder')}
  <div class="root" on:click|stopPropagation={select} class:outline>
    <div class="bar">
      <div class="titles">
        <div>{data.name.toLowerCase()}</div>
        <div class="subtitle">{data.id}</div>
      </div>
      <div class="open" on:click={toggleOpen}>{icon}</div>
    </div>
    <div class="content" class:hidden>
      {#each data.children as child (child.id)}
        <svelte:self bind:data={child} />
      {/each}
    </div>
  </div>
{/if}

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

  .open {
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

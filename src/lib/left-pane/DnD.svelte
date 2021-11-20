<script lang="ts">
  import { flip } from 'svelte/animate'
  import { dndzone, TRIGGERS } from 'svelte-dnd-action'
  import htmlnames from '$lib/components'
  import { makeid } from '$lib/utils'

  let search = ''
  const flipDurationMs = 300

  $: items = htmlnames.filter((item) =>
    item.name.toLowerCase().includes(search)
  )

  function handleDndConsider(event) {
    const { trigger, id } = event.detail.info
    if (trigger === TRIGGERS.DRAG_STARTED) {
      const idx = items.findIndex((item) => item.id === id)
      const item = { ...items[idx] }
      item.props = { ...item.props }
      item.style = { ...item.style }
      item.children = [...item.children]
      item.id = makeid()
      event.detail.items.splice(idx, 0, item)
    }
    items = event.detail.items
  }

  function handleDndFinalize(event) {
    items = event.detal.items
  }

  function changeSearch(event) {
    search = event.target.value
  }
</script>

<div class="search">
  <input on:input={changeSearch} />
</div>

<section
  class="root"
  use:dndzone={{ items, flipDurationMs, dropFromOthersDisabled: true }}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
>
  {#each items as item (item.id)}
    <div class="element" animate:flip={{ duration: flipDurationMs }}>
      {item.name.toLowerCase()}
    </div>
  {/each}
</section>

<style>
  .root {
    flex: 1;
    overflow: auto;
    width: 100%;
  }

  .element {
    border-style: dotted;
    border-width: 1px;
    margin: 3px;
    padding: 3px;
  }

  .search {
    padding: 10px;
    width: 100%;
  }
</style>

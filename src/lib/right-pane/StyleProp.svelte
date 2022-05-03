<script lang="ts">
  import { design } from '$lib/store'

  export let name = ''
  let newname = name
  export let data = { name: '' }
  const value = data[name]
  let editing = null
  let hover: boolean = false

  function edit(type: string) {
    function inner() {
      editing = type
      $design = $design
    }
    return inner
  }

  function rename() {
    const value = data[name]
    data[newname] = value
    delete data[name]
    name = newname
    data = data
    $design = $design
    editing = null
  }

  function cancel() {
    data[name] = value
  }

  function remove() {
    delete data[name]
    data = data
    $design = $design
  }

  function hoverProp() {
    hover = true
  }

  function unhoverProp() {
    hover = false
  }
</script>

<div class="root">
  {#if data[name] !== undefined}
    {#if editing === 'name'}
      <form on:submit|preventDefault={rename}>
        <input bind:value={newname} />
        <button type="submit" class="button outline primary">OK</button>
        <button class="button outline secondary" on:click={edit(null)}>
          Cancel
        </button>
      </form>
    {:else if editing === 'value'}
      <form on:submit|preventDefault={edit(null)}>
        <input bind:value={data[name].value} />
        <button type="submit" class="button outline primary">OK</button>
        <button class="button outline secondary" on:click={cancel}>
          Cancel
        </button>
      </form>
    {:else}
      <div
        on:mouseover={hoverProp}
        on:focus={hoverProp}
        on:mouseleave={unhoverProp}
        on:blur={unhoverProp}
      >
        <span on:click={edit('name')}>{name}</span>:
        <span on:click={edit('value')}>{data[name].value}</span>
        <span class="tool" class:hover on:click={remove}>-</span>
      </div>
    {/if}
  {/if}
</div>

<style>
  .root {
    margin-left: 10px;
  }

  .tool {
    color: #0000;
  }

  .hover {
    color: black;
  }
</style>

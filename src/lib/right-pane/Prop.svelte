<script lang="ts">
  import AddProp from './AddProp.svelte'
  import { isSimple } from '$lib/utils'

  export let data = { name: '' }
  export let name = ''
  let hover = false
  let add = false
  let removeHover = false

  function setHover() {
    hover = true
  }

  function unsetHover() {
    hover = false
  }

  function openAdd() {
    add = true
  }

  function remove() {
    delete data[name]
    data = data
  }

  function hoverRemove() {
    removeHover = true
  }

  function leaveRemove() {
    removeHover = false
  }
</script>

<div class="root">
  {#if isSimple(data[name])}
    <span
      on:mouseover={hoverRemove}
      on:focus={hoverRemove}
      on:mouseleave={leaveRemove}
      on:blur={leaveRemove}
    >
      {name}: {data[name]}
      <span class="tool" class:hover={removeHover} on:click={remove}>-</span>
    </span>
  {:else}
    <span
      on:mouseover={setHover}
      on:focus={setHover}
      on:mouseleave={unsetHover}
      on:blur={unsetHover}
    >
      {name}: &#123;
      <span class="tool" class:hover on:click={openAdd}>+</span>
      <span class="tool" class:hover on:click={remove}>-</span>
    </span>
    {#each Object.keys(data[name]) as propname}
      <svelte:self bind:data={data[name]} name={propname} />
    {/each}
    <div>&#125;</div>
  {/if}
</div>

<AddProp bind:open={add} bind:data={data[name]} />

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

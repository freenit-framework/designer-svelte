<script lang="ts">
  import AddProp from './AddProp.svelte'
  import { isSimple, isObject } from '$lib/utils/props'

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
    if (Array.isArray(data)) {
      data.splice(Number(name), 1)
    } else {
      delete data[name]
    }
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
      {#if Array.isArray(data)}
        {data[name].value}
      {:else}
        {name}: {data[name].value}
      {/if}
      <span class="tool" class:hover={removeHover} on:click={remove}>-</span>
    </span>
  {:else if isObject(data[name])}
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
    {#each Object.keys(data[name].value) as propname}
      <svelte:self bind:data={data[name].value} name={propname} />
    {/each}
    <div>&#125;</div>
  {:else if Array.isArray(data[name].value)}
    <span
      on:mouseover={setHover}
      on:focus={setHover}
      on:mouseleave={unsetHover}
      on:blur={unsetHover}
    >
      {name}: [
      <span class="tool" class:hover on:click={openAdd}>+</span>
      <span class="tool" class:hover on:click={remove}>-</span>
    </span>
    {#each data[name].value as _value, index}
      <svelte:self bind:data={data[name].value} name={index} />
    {/each}
    <div>]</div>
  {/if}
</div>

<AddProp bind:open={add} bind:data />

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

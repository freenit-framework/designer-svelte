<!-- svelte-ignore a11y-autofocus -->
<script lang="ts">
  import { theme } from '$lib/store'
  import { setThemeProp } from '$lib/utils'

  let editing: string | null = null
  let oldValue: string | null = null

  const edit = (prop: string) => () => {
    editing = prop
    oldValue = $theme[prop]
  }

  function change() {
    setThemeProp(editing, $theme[editing])
    editing = null
  }

  function cancel() {
    $theme[editing] = oldValue
    editing = null
  }
</script>

<div class="root">
  {#each Object.keys($theme) as prop}
    {#if editing === prop}
      <form on:submit|preventDefault={change}>
        <input bind:value={$theme[prop]} autofocus />
        <button class="button" type="submit">OK</button>
        <button class="button" on:click={cancel}>Cancel</button>
      </form>
    {:else}
      <div on:click={edit(prop)}>{prop}: {$theme[prop]}</div>
    {/if}
  {/each}
</div>

<style>
  .root {
    flex: 1;
    padding: 10px;
  }
</style>

<script lang="ts">
  import type { UndoItem } from '$lib/types'
  import { design, theme, undo } from '$lib/store'

  export let onClose: any
  export let data: Record<string, any> = { attribute: { value: '' } }
  export let name = 'attribute'
  let { value } = data[name]

  function submit() {
    const item: UndoItem = {
      parent: data[name],
      attribute: 'value',
      value: data[name].value,
    }
    data[name].value = value
    $design = $design
    $theme = $theme
    $undo = [...$undo, item]
    onClose()
  }
</script>

<!-- svelte-ignore a11y-autofocus -->
<div class="root">
  <form on:submit|preventDefault={submit}>
    <label for="value" class="label">{name}:</label>
    <input required autofocus name="value" bind:value />
    <div class="buttons">
      <button class="button outline primary">OK</button>
      <button class="button outline secondary" on:click={onClose}>
        Cancel
      </button>
    </div>
  </form>
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .buttons {
    margin-top: 10px;
  }

  .label {
    margin-left: 10px;
  }
</style>

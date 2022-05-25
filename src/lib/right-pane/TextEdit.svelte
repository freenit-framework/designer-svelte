<script lang="ts">
  import type { UndoItem } from '$lib/types'
  import { design, undo } from '$lib/store'

  export let onClose: any
  export let data: Record<string, any> = { text: '' }
  let value = data.text

  function submit() {
    const item: UndoItem = {
      parent: data,
      attribute: 'text',
      value,
    }
    data.text = value
    $design = $design
    $undo = [...$undo, item]
    onClose()
  }
</script>

<!-- svelte-ignore a11y-autofocus -->
<div class="root">
  <form on:submit|preventDefault={submit}>
    <label for="value" class="label">text:</label>
    <input autofocus name="value" bind:value />
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

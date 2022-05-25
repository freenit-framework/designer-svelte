<script lang="ts">
  import { onMount } from 'svelte'
  import type { UndoItem } from '$lib/types'
  import { design, theme, undo } from '$lib/store'

  export let onClose: any
  export let data: Record<string, any> = { attribute: { value: '' } }
  export let name = 'attribute'
  let oldValue: any

  onMount(() => {
    oldValue = data[name].value
  })

  function submit() {
    const item: UndoItem = {
      parent: data[name],
      attribute: 'value',
      value: oldValue,
    }
    $design = $design
    $theme = $theme
    $undo = [...$undo, item]
    onClose()
  }

  function cancel() {
    data[name].value = oldValue
    onClose()
  }

  function edit(event: any) {
    data[name].value = event.target.value
    $design = $design
  }
</script>

<!-- svelte-ignore a11y-autofocus -->
<div class="root">
  <form on:submit|preventDefault={submit}>
    <label for="value" class="label">{name}:</label>
    <input
      required
      autofocus
      name="value"
      on:input={edit}
      value={data[name].value}
    />
    <div class="buttons">
      <button class="button outline primary">OK</button>
      <button class="button outline secondary" on:click={cancel}>
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

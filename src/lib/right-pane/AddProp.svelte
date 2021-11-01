<script lang="ts">
  import { design } from '$lib/store'
  import Modal from '$lib/Modal.svelte'

  let name = ''
  let value = ''
  export let open: boolean = false
  export let data = {}

  function addProp() {
    if (name === 'style') {
      return
    }
    if (value === '{}') {
      data[name] = {}
    } else if (value === '[]') {
      data[name] = []
    } else {
      data[name] = value
    }
    open = false
    $design = $design
  }

  function close() {
    open = false
  }
</script>

<Modal {open}>
  <form on:submit|preventDefault={addProp}>
    <label for="name">Name</label>
    <input name="name" bind:value={name} autofocus required />
    <label for="value">Value</label>
    <input name="value" bind:value required />
    <div class="buttons">
      <button type="submit" class="button outline primary">OK</button>
      <button class="button outline secondary" on:click={close}>
        Cancel
      </button>
    </div>
  </form>
</Modal>

<style>
  .buttons {
    margin-top: 10px;
  }
</style>

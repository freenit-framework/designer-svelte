<script lang="ts">
  import { design } from '$lib/store'
  import Modal from '$lib/Modal.svelte'

  export let open = false
  export let value = ''
  const oldValue = value

  function close() {
    open = false
    $design = $design
  }

  function cancel() {
    value = oldValue
    open = false
  }
</script>

<!-- svelte-ignore a11y-autofocus -->
<Modal {open}>
  <form on:submit|preventDefault={close}>
    <label for="text">Text</label>
    <input name="text" bind:value autofocus />
    <div class="buttons">
      <button class="button outline primary">OK</button>
      <button class="button outline secondary" on:click={cancel}>
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

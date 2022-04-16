<script lang="ts">
  import DnD from './DnD.svelte'
  import { toJson } from '$lib/utils'
  import { design } from '$lib/store'
  import { Base64 } from 'js-base64'

  let saveDownload: string | null = null

  function save() {
    saveDownload = null
    const saveOut = toJson($design)
    const json = JSON.stringify(saveOut)
    saveDownload = `data:application/json;base64,${Base64.encode(json)}`
  }
</script>

<div class="root">
  <div class="panel">
    <button class="button outline" disabled>Components</button>
    <button class="button outline">Icons</button>
  </div>
  <DnD />
  <div class="buttons">
    <a href={saveDownload} download="design.json">
      <button
        class="button outline"
        on:mouseover={save}
        on:focus={save}
        disabled={saveDownload === null}
      >
        Save
      </button>
    </a>
    <button class="button outline primary">Load</button>
    <button class="button outline">Export</button>
  </div>
</div>

<style>
  .root {
    width: 300px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
  }

  .panel {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }

  .buttons {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: white;
  }
</style>

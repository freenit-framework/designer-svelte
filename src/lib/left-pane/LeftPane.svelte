<script lang="ts">
  import DnD from './DnD.svelte'
  import {
    exportCode,
    exportStyle,
    exportText,
    toJson,
    toObject,
  } from '$lib/utils'
  import { design } from '$lib/store'
  import { Base64 } from 'js-base64'

  let saveDownload: string | null = null
  let exportDownload: string | null = null
  let fileInput: any

  function save() {
    saveDownload = null
    const saveOut = toJson($design)
    const json = JSON.stringify(saveOut)
    saveDownload = `data:application/json;base64,${Base64.encode(json)}`
  }

  function exporter() {
    exportDownload = null
    const text = $design.children.map((c) => exportText(c)).join()
    const children = $design.children.map((c) => exportCode(c)).join()
    const style = $design.children.map((c) => exportStyle(c)).join()
    const code = `\<script lang="ts"\>\n  const data = {${text}\n  }\n\</script\>\n\n${children}\n\<style\>\n${style}\</style\>\n`
    exportDownload = `data:application/json;base64,${Base64.encode(code)}`
  }

  function load() {
    fileInput.click()
  }

  function handleFile(event: any) {
    if (event.target.files.length > 0) {
      const [file] = event.target.files
      const reader = new FileReader()
      reader.onload = (e) => {
        $design = toObject(`${e.target.result}`)
      }
      reader.readAsText(file)
    }
  }
</script>

<div class="root">
  <div class="panel">
    <button class="button outline" disabled>Components</button>
    <button class="button outline">Icons</button>
  </div>
  <DnD />
  <div class="buttons">
    <a
      class="button outline"
      on:mouseover={save}
      on:focus={save}
      href={saveDownload}
      download="design.json"
    >
      Save
    </a>
    <button class="button outline primary" on:click={load}>Load</button>
    <a
      class="button outline"
      on:mouseover={exporter}
      on:focus={exporter}
      href={exportDownload}
      download="page.svelte"
    >
      Export
    </a>
  </div>
</div>

<input
  style="display: none"
  type="file"
  accept=".json"
  bind:this={fileInput}
  on:change={handleFile}
/>

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

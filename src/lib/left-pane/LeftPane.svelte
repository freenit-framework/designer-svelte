<script lang="ts">
  import DnD from './DnD.svelte'
  import {
    exportCode,
    exportStyle,
    exportText,
    toJson,
    toObject,
    object2component,
    setThemeProp,
  } from '$lib/utils'
  import { design, theme } from '$lib/store'
  import { Base64 } from 'js-base64'

  let saveDownload: string | null = null
  let exportDownload: string | null = null
  let fileInput: any

  function save() {
    saveDownload = null
    const data = {
      design: toJson($design),
      theme: $theme,
    }
    const json = JSON.stringify(data, null, 2)
    saveDownload = `data:application/json;base64,${Base64.encode(json)}`
  }

  function exporter() {
    exportDownload = null
    const text = $design.children.map((c) => exportText(c)).join()
    const children = $design.children.map((c) => exportCode(c)).join()
    const style = $design.children.map((c) => exportStyle(c)).join()
    const scriptData = `\<script lang="ts"\>\n  const data = {${text}\n  }\n\<\/script\>`
    const childrenData = `\n\n${children}\n`
    let globalStyle = `  :global(:root) {\n`
    for (const prop of Object.keys($theme)) {
      globalStyle += `    --${prop}: ${$theme[prop]};\n`
    }
    globalStyle += '  }\n'
    const styleData = `\<style\>\n${globalStyle}\n${style}\<\/style\>\n`
    const code = `${scriptData}${childrenData}${styleData}`
    exportDownload = `data:application/json;base64,${Base64.encode(code)}`
  }

  function openFile() {
    fileInput.click()
  }

  function load(event: any) {
    if (event.target.files.length > 0) {
      const [file] = event.target.files
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result)
        $design = object2component(data.design)
        $theme = data.theme
        for (const prop in data.theme) {
          setThemeProp(prop, data.theme[prop])
        }
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
    <button class="button outline primary" on:click={openFile}>Load</button>
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
  on:change={load}
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

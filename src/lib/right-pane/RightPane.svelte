<script lang="ts">
  import Tree from './Tree.svelte'
  import Props from './Props.svelte'
  import Theme from './Theme.svelte'
  import {
    mdiRedo,
    mdiUndo,
    mdiCellphone,
    mdiTablet,
    mdiLaptop,
    mdiSelectSearch,
  } from '@mdi/js'
  import { undo, redo } from '$lib/undo'
  import { findSelected } from '$lib/utils'
  import { design } from '$lib/store'

  let tab = 'props'

  function mobile() {
    console.log('mobile')
  }

  function tablet() {
    console.log('tablet')
  }

  function computer() {
    console.log('computer')
  }

  function props() {
    tab = 'props'
  }

  function theme() {
    tab = 'theme'
  }

  function search() {
    findSelected($design)
    $design = $design
  }
</script>

<div class="root">
  <div class="panel">
    <button class="button outline" disabled={tab === 'props'} on:click={props}>
      Props
    </button>
    <button class="button outline" disabled={tab === 'theme'} on:click={theme}>
      Theme
    </button>
  </div>
  {#if tab === 'props'}
    <div class="tools">
      <svg class="icon" on:click={undo}>
        <path d={mdiUndo} />
      </svg>
      <svg class="icon" on:click={redo}>
        <path d={mdiRedo} />
      </svg>
      <svg class="icon" on:click={search}>
        <path d={mdiSelectSearch} />
      </svg>
    </div>
    <div class="content">
      <Tree />
      <Props />
    </div>
  {:else if tab === 'theme'}
    <div class="tools">
      <svg class="icon" on:click={undo}>
        <path d={mdiUndo} />
      </svg>
      <svg class="icon" on:click={redo}>
        <path d={mdiRedo} />
      </svg>
    </div>
    <Theme />
  {/if}
  <div class="buttons">
    <svg class="icon" on:click={mobile}>
      <path d={mdiCellphone} />
    </svg>
    <svg class="icon" on:click={tablet}>
      <path d={mdiTablet} />
    </svg>
    <svg class="icon" on:click={computer}>
      <path d={mdiLaptop} />
    </svg>
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

  .tools {
    width: 100%;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .buttons {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: white;
  }

  .icon {
    height: 32px;
    width: 32px;
    margin: 0px 5px;
    fill: #666;
  }

  .icon:hover {
    fill: black;
  }
</style>

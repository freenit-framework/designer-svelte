<script lang="ts">
  import Tree from './Tree.svelte'
  import Props from './Props.svelte'
  import {
    mdiRedo,
    mdiUndo,
    mdiCellphone,
    mdiTablet,
    mdiLaptop,
    mdiMenu,
  } from '@mdi/js'

  function undo() {
    console.log('undo')
  }

  function redo() {
    console.log('redo')
  }

  function mobile() {
    console.log('mobile')
  }

  function tablet() {
    console.log('tablet')
  }

  function computer() {
    console.log('computer')
  }
</script>

<div class="root">
  <div class="panel">
    <button class="button outline" disabled>Props</button>
    <button class="button outline">Theme</button>
  </div>
  <div class="tools">
    <svg class="icon" on:click={undo}>
      <path d={mdiUndo} />
    </svg>
    <svg class="icon" on:click={redo}>
      <path d={mdiRedo} />
    </svg>
  </div>
  <div class="content">
    <Tree />
    <Props />
  </div>
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

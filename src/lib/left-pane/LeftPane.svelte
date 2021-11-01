<script lang="ts">
  import DnD from './DnD.svelte'
</script>

<div class="root">
  <div class="panel">
    <button class="button outline" disabled>Components</button>
    <button class="button outline">Icons</button>
  </div>
  <DnD />
  <div class="buttons">
    <button class="button outline">Save</button>
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

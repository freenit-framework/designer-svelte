<script lang="ts">
  import { theme } from '$lib/store'
</script>

<div class="root">
  {#each Object.keys($theme) as prop}
    <div>{prop}: {$theme[prop]}</div>
  {/each}
</div>

<style>
  .root {
    flex: 1;
    padding: 10px;
  }
</style>

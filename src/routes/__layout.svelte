<script lang="ts">
  import 'chota'
  import '../app.css'
</script>

<svelte:head>
  <title>Freenit Designer for Svelte</title>
</svelte:head>

<main>
  <slot />
</main>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

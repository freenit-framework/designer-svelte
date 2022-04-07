<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import LeftPane from '$lib/left-pane'
  import RightPane from '$lib/right-pane'
  import Preview from '$lib/preview'
</script>

<section>
  <LeftPane />
  <Preview />
  <RightPane />
</section>

<style>
  section {
    display: flex;
    align-items: stretch;
    justify-content: center;
    height: 100vh;
  }
</style>

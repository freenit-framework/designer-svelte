<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import LeftPane from '$lib/left-pane'
  import RightPane from '$lib/right-pane'
  import Preview from '$lib/preview'
  import { undo, design, selected, initialComponent } from '$lib/store'
  import type { UndoItem } from '$lib/types'

  function handleKeyDown(event: any) {
    const { key, ctrlKey } = event
    if (key === 'Delete') {
      if ($selected.id !== null) {
        const { parent } = $selected
        if (parent) {
          const element = parent.children
            .map((child) => child.id)
            .indexOf($selected.id)
          const item: UndoItem = {
            parent: parent.children,
            attribute: element,
            value: $selected,
          }
          parent.children.splice(element, 1)
          $undo = [...$undo, item]
          $selected = { ...initialComponent }
          $design = $design
        }
      }
    } else if (ctrlKey && key === 'c') {
      console.log('copy')
    } else if (ctrlKey && key === 'v') {
      console.log('paste')
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

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

<script lang="ts">
  import { dndzone } from 'svelte-dnd-action'
  import { prepareStyle } from '$lib/utils'

  export let props = {}
  export let style = {}
  export let items = []

  $: s = prepareStyle(style)

  function handleDnd(event) {
    items = event.detail.items
  }
</script>

<frameset
  {...props}
  style={s}
  use:dndzone={{ items }}
  on:consider={handleDnd}
  on:finalize={handleDnd}
>
  <slot />
</frameset>

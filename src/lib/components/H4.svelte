<script lang="ts">
  import { prepareStyle } from '$lib/utils'

  export let props = {}
  export let style = {}
  export const items = []

  $: s = prepareStyle(style)
</script>

<h4 {...props} style={s}>
  <slot />
</h4>

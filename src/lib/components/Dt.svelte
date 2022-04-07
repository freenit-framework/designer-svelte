<script lang="ts">
  import { prepareStyle } from '$lib/utils'

  export let props = {}
  export let style = {}
  export const items = []

  $: s = prepareStyle(style)
</script>

<dt {...props} style={s}>
  <slot />
</dt>

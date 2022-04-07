<script lang="ts">
  import { prepareStyle } from '$lib/utils'

  export let props = {}
  export let style = {}
  export const items = []

  $: s = prepareStyle(style)
</script>

<dd {...props} style={s}>
  <slot />
</dd>

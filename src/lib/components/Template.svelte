<script lang="ts">
  import { prepareStyle } from '$lib/utils'

  export const props = {}
  export let style = {}

  $: s = prepareStyle(style)
</script>

<template {...props} style={s}>
  <slot />
</template>

<script lang="ts">
  import { SHADOW_PLACEHOLDER_ITEM_ID } from 'svelte-dnd-action'
  import { selected } from '$lib/store'

  export let data = {
    id: '',
    component: '',
    props: {},
    style: {},
    children: [],
    text: '',
  }
  $: style = {
    ...data.style,
    cursor: 'grab',
    'user-select': 'none',
    'border-width': $selected.id === data.id ? '1px' : '0px',
    'border-color': 'black',
    'border-style': 'dotted',
  }
</script>

<svelte:component
  this={data.component}
  props={data.props}
  bind:items={data.children}
  bind:style
>
  {data.text}
  {#each data.children.filter((item) => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item (item.id)}
    <svelte:self bind:data={item} />
  {/each}
</svelte:component>

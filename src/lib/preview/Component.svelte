<script lang="ts">
  import { selected } from '$lib/store'

  export let item = {
    id: '',
    component: '',
    props: {},
    style: {},
    children: [],
    text: '',
  }
  $: style = {
    ...item.style,
    cursor: 'grab',
    'user-select': 'none',
    'border-width': $selected.id === item.id ? '1px' : '0px',
    'border-color': 'black',
    'border-style': 'dotted',
  }
</script>

{#if !item.id.startsWith('id:dnd-shadow-placeholder')}
  <svelte:component
    this={item.component}
    props={item.props}
    bind:items={item.children}
    bind:style
  >
    {item.text}
    {#each item.children as child}
      <svelte:self item={child} />
    {/each}
  </svelte:component>
{/if}

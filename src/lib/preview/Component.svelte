<script lang="ts">
  export let item = {}
</script>

{#if !item.id.startsWith('id:dnd-shadow-placeholder')}
  <svelte:component
    this={item.component}
    props={item.props}
    style={item.style}
    bind:items={item.children}
  >
    {item.text}
    {#each item.children as child}
      <svelte:self item={child} />
    {/each}
  </svelte:component>
{/if}

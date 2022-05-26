<script lang="ts">
  import * as icons from '@mdi/js'
</script>

<div class="root">
  {#each Object.keys(icons) as iconName}
    <span title={iconName}>
      <svg class="icon">
        <path d={icons[iconName]} />
      </svg>
    </span>
  {/each}
</div>

<style>
  .root {
    flex: 1;
    overflow: auto;
    width: 100%;
  }

  .icon {
    height: 32px;
    width: 32px;
    margin: 0px 5px;
    fill: #666;
  }
</style>

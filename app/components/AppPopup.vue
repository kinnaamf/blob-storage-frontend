<template>
<div class="bg-brand-card/90 rounded-lg p-1 border border-brand-border shadow-md w-48 overflow-y-auto">
  <ul>
    <li class="dropdown-menu-item"
        @click=""

    >
      <LucideEye :size="16"/>
      Preview
    </li>
    <li class="dropdown-menu-item"
      @click=""
    >
      <LucideDownload :size="16"/>
      Download
    </li>
    <li class="dropdown-menu-item"
        @click=""
    >
      <LucideShare2 :size="16"/>
      Share
    </li>
    <li class="bg-brand-border h-px -mx-1 my-1"></li>
    <li class="dropdown-menu-item text-red-500"
        @click=""
    >
      <LucideTrash :size="16"/>
      Delete
    </li>
  </ul>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="postcss">
  .dropdown-menu-item {
    @apply flex items-center gap-4 cursor-pointer px-2 py-1.5 text-sm font-medium hover:bg-brand-secondary rounded-md transition-all duration-200
  }
</style>
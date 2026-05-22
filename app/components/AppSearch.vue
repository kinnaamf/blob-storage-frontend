<script setup lang="ts">

</script>

<template>
  <div class="relative w-full max-w-md">
    <LucideSearch
        class="absolute top-3 left-3 stroke-brand-muted"
        :size="16"
    />
    <input
        class="h-10 pl-10 w-full
        text-sm placeholder:text-brand-muted text-white
        bg-brand-secondary rounded-2xl border border-brand-border
        outline-none focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
        type="text"
        placeholder="Search files, folders..."
    >
  </div>
</template>

<style scoped lang="postcss">

</style>
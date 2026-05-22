<template>
  <aside class="w-64 h-screen bg-brand-darkest border-r border-brand-border fixed left-0 top-0 z-50 flex flex-col">
    <div class="h-16 flex items-center px-6 gap-3 border-b border-brand-border">
      <div class="bg-brand-primary w-9 h-9 flex items-center justify-center rounded-2xl">
        <LucideCloud :size="20"></LucideCloud>
      </div>
      <span class="text-lg font-semibold tracking-tight">Blob Storage</span>
    </div>
    <AppNavbar/>
  </aside>
</template>

<script setup lang="ts">

import AppNavbar from "~/components/AppNavbar.vue";
</script>

<style scoped lang="postcss">

</style>
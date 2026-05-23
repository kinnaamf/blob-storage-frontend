<template>
  <div class="flex">
    <aside class="w-64 h-screen bg-brand-darkest border-r border-brand-border fixed left-0 top-0 z-50 flex flex-col">
      <div class="h-16 flex items-center px-6 gap-3 border-b border-brand-border">
        <div class="bg-brand-primary w-9 h-9 flex items-center justify-center rounded-2xl">
          <LucideCloud :size="20"></LucideCloud>
        </div>
        <span class="text-lg font-semibold tracking-tight">Blob Storage</span>
      </div>
      <AppNavbar/>
      <div class="border-t border-brand-border p-4">
        <div class="rounded-2xl bg-brand-secondary p-4">
          <div class="mb-3 flex items-center justify-between">
            <span class="text-sm font-medium text-brand-foreground">Storage</span>
            <span class="text-xs text-brand-muted">{{ occupied }} GB of {{ total }} GB</span>
          </div>
          <div class="mb-3 h-2 w-full overflow-hidden rounded-full bg-brand-bg">
            <div
                class="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-primary/70 transition-all duration-500"
                :style="{ width: `${occupied * 10}%` }"
            ></div>
          </div>
          <span class="text-xs text-brand-muted">{{ remaining }} GB remaining</span>
        </div>
      </div>
    </aside>
    <div class="pl-64 flex-1 min-h-screen">
      <AppHeader />
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">

import AppNavbar from "~/components/AppNavbar.vue";

const GB_FACTOR = 1024 ** 3;

const totalBytes = ref<number>(10 * GB_FACTOR);
const usedBytes = ref<number>(3.5 * GB_FACTOR);

const occupied: number = computed(() => {
  return (((usedBytes.value / GB_FACTOR) * 10) / 10).toFixed(1);
})

const total = computed(() => {
  return (((totalBytes.value / GB_FACTOR) * 10) / 10).toFixed(1);
})

const remaining = computed(() => {
  const diff: number = total.value - occupied.value;
  return ((diff * 10) / 10).toFixed(1);
})
</script>
<template>
  <div class="grid grid-cols-3 gap-4 mb-8">
    <div class="rounded-2xl border border-brand-border bg-brand-card p-4">
      <p class="text-sm text-brand-muted">Total Links</p>
      <p class="mt-1 text-2xl font-bold text-foreground">{{ totalLinksCount }}</p>
    </div>

    <div class="rounded-2xl border border-brand-border bg-brand-card p-4">
      <p class="text-sm text-brand-muted">Total Downloads</p>
      <p class="mt-1 text-2xl font-bold text-foreground">{{ totalDownloadsCount }}</p>
    </div>

    <div class="rounded-2xl border border-brand-border bg-brand-card p-4">
      <p class="text-sm text-brand-muted">Expiring Soon</p>
      <p class="mt-1 text-2xl font-bold text-amber-500">{{ expiringSoonCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SharedLinkFile } from "~/types/file";

const props = defineProps<{
  links: SharedLinkFile[];
}>()

const totalLinksCount = computed(() => {
  return props.links.length
})

const totalDownloadsCount = computed(() => {
  return props.links.length
})

const expiringSoonCount = computed(() => {
  return props.links.filter((item) => item.status === 'Expiring').length
})
</script>

<style scoped lang="postcss">

</style>
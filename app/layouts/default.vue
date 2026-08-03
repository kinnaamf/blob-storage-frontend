<template>
  <div class="min-h-screen">
    <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 bg-[#04070f]/80 backdrop-blur-sm md:hidden"
        @click="isMenuOpen = false"
    />

    <aside
        class="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-brand-border bg-[#02040b] transition-transform duration-300"
        :class="[
        isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div class="flex h-16 items-center justify-between md:justify-normal gap-3 border-b border-brand-border px-6">
        <div class="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-primary text-white">
          <LucideCloud :size="20" />
        </div>
        <h2 class="text-lg font-semibold tracking-tight">Blob Storage</h2>

        <button
            class="h-8 w-8 md:hidden"
            @click="isMenuOpen = false"
        >
          <LucideX class="stroke-brand-muted cursor-pointer hover:stroke-brand-foreground transition-all duration-200" :size="20"/>
        </button>
      </div>

      <AppNavbar />

      <div class="border-t border-brand-border p-4 mt-auto">
        <div class="rounded-2xl bg-brand-secondary p-4">
          <div class="mb-3 flex items-center justify-between">
            <span class="text-sm font-medium text-brand-foreground">Storage</span>
            <span class="text-xs text-brand-muted">
              {{ fileStore.formattedUsedSpace }} of {{ totalSpaceGB }} GB
            </span>
          </div>

          <div class="mb-3 h-2 w-full overflow-hidden rounded-full bg-brand-bg">
            <div
                class="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-primary/70 transition-all duration-500"
                :style="{ width: `${storagePercentage}%` }"
            />
          </div>

          <span class="text-xs text-brand-muted">{{ remainingStorageInGB }} GB remaining</span>
        </div>
      </div>
    </aside>

    <div class="min-h-screen flex-1 md:pl-64 transition-all duration-300">
      <AppHeader />
      <main class="p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMenu } from '~/composables/useMenu'
import { useFileStore } from '~/stores/fileUploader'

const { isMenuOpen } = useMenu()
const fileStore = useFileStore()

const totalSpaceGB = computed(() => {
  if (!fileStore.GB_FACTOR) return 0
  return fileStore.TOTAL_AVAILABLE_SPACE / fileStore.GB_FACTOR
})

const remainingStorageInGB = computed(() => {
  const usedGB = fileStore.getTotalUsedSpace / fileStore.GB_FACTOR
  return Math.max(0, totalSpaceGB.value - usedGB).toFixed(2)
})

const storagePercentage = computed(() => {
  if (!fileStore.TOTAL_AVAILABLE_SPACE) return 0
  const percentage = (fileStore.getTotalUsedSpace / fileStore.TOTAL_AVAILABLE_SPACE) * 100
  return Math.min(100, Math.max(0, percentage))
})
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-100%);
}
</style>
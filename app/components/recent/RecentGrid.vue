<template>
  <div
      v-for="file in fileStore.uploadedFiles"
      :key="file.name"
      class="bg-brand-secondary/40 rounded-2xl border border-brand-border p-4"
  >

    <div class="mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
      <div class="w-full h-full rounded-lg bg-brand-card flex items-center justify-center shrink-0 overflow-hidden border border-brand-border/30">
        <img
            v-if="file.type.startsWith('image/')"
            :src="getFilePreview(file)"
            class="w-full h-full object-cover p-4"
            alt=""
        />

        <component
            v-else
            :is="getFileIcon(file)"
            :size="64"
            :class="getFileIconClass(file)"
            class="p-4 rounded-2xl"
        />
      </div>
    </div>

    <div class="flex justify-between mb-3">
      <h4 class="text-sm font-medium text-brand-foreground">{{ normalizeFilename(file.name) }}</h4>

      <button
          @mouseenter="hoveredFile = file.name"
          @mouseleave="hoveredFile = null"
          class="h-7 w-7 group
          flex items-center justify-center
          rounded-lg
          hover:bg-brand-secondary transition-all duration-200">
        <LucideEllipsis :size="16" :class="hoveredFile === file.name ? 'stroke-brand-foreground' : 'stroke-brand-muted'" />
      </button>
    </div>

    <div>
      <h3 class="text-xs text-brand-muted shrink-0">
        {{`${ getSize(file.size).fileSize } ${ getSize(file.size).storageUnit }` }}
      </h3>
    </div>

  </div>
</template>

<script setup lang="ts">
const fileStore = useFileStore()
const { normalizeFilename, getFilePreview, getFileIcon, getFileIconClass, getSize } = useFileUploader()

const hoveredFile = ref<string | null>(null)

</script>
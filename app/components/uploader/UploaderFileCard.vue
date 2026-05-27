<script setup lang="ts">
defineProps<{
  file: any
}>()

const { getFileIcon, getSize, getFileIconClass, getFilePreview, normalizeFilename } = useFileUploader()

</script>

<template>
  <div class="w-36 h-36 rounded-lg bg-brand-card flex items-center justify-center shrink-0 overflow-hidden border border-brand-border/30">
    <img
        v-if="file.type.startsWith('image/')"
        :src="getFilePreview(file)"
        class="w-full h-full object-cover"
        alt=""
    />

    <component
        v-else
        :is="getFileIcon(file)"
        :size="64"
        :class="getFileIconClass(file)"
    />
  </div>
  <div class="flex justify-between items-center w-full">
    <h3 class="text-sm font-medium text-white">{{ normalizeFilename(file.name) }}</h3>
    <div>
      <span class="text-xs text-brand-muted shrink-0">{{ getSize(file.size).fileSize }}</span>
      <span class="text-xs text-brand-muted shrink-0">{{ getSize(file.size).storageUnit }}</span>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
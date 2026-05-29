<template>
  <div v-if="file" class="gap-3 flex items-center min-w-0 w-full">
    <div class="w-9 h-9 bg-brand-primary/10 flex items-center justify-center rounded-xl">
      <img
          v-if="file.type.startsWith('image/')"
          :src="getFilePreview(file)"
          class="w-full h-full object-cover rounded-xl"
          alt=""
      />

      <component
          v-else
          :is="getFileIcon(file)"
          :size="16"
          :class="getFileIconClass(file)"
      />
    </div>

    <div class="flex flex-col gap-0.5">
      <span class="text-sm text-brand-foreground font-medium">{{ normalizeFilename(file.name) }}</span>
      <span class="text-xs text-brand-muted">
      {{ `${ getSize(file.size).fileSize } ${ getSize(file.size).storageUnit }` }}
    </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getFileIcon, getFileIconClass, getFilePreview, normalizeFilename, getSize } = useFileUploader()

defineProps<{
  file: any
}>()

</script>
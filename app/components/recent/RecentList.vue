<template>
  <div
      v-for="(file, index) in fileStore.uploadedFiles"
      :key="file.name"
      class="flex items-center justify-between p-4 transition-all hover:bg-brand-secondary/50 border-b border-brand-border duration-200"
      :class="[index === 0 ? 'rounded-t-2xl' : '', index === fileStore.uploadedFiles.length - 1 ? 'rounded-b-2xl' : '']"
  >
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-lg bg-brand-card flex items-center justify-center shrink-0 overflow-hidden border border-brand-border/30">
        <img
            v-if="file.type.startsWith('image/')"
            :src="getFilePreview(file)"
            class="w-full h-full object-cover"
            alt=""
        />

        <component
            v-else
            :is="getFileIcon(file)"
            :size="24"
            :class="getFileIconClass(file)"
        />
      </div>
      <div class="flex flex-col">
        <h3 class="text-sm font-medium text-brand-foreground">{{ normalizeFilename(file.name) }}</h3>
        <h3 class="text-xs text-muted">{{ `${getSize(file.size).fileSize} ${getSize(file.size).storageUnit}` }}</h3>
      </div>
    </div>

    <div>
      <div class="h-8 w-8 rounded-xl flex items-center justify-center hover:bg-brand-secondary transition-all duration-200 group">
        <LucideEllipsis :size="16" class="stroke-brand-muted group-hover:stroke-brand-foreground transition-all duration-200" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const fileStore = useFileStore()

const { normalizeFilename, getFilePreview, getFileIcon, getFileIconClass, getSize } = useFileUploader()

</script>
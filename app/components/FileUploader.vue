<template>
  <div
      class="relative p-8 cursor-pointer rounded-2xl border-2 border-dashed text-center transition-all duration-200"
      :class="isDragging
      ? 'border-brand-primary bg-brand-primary/5'
      : 'border-brand-border bg-brand-card hover:border-brand-primary/50 hover:bg-brand-card/50'"
      @dragenter.prevent="isDragging = true"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
  >
    <input
        type="file"
        id="upload"
        ref="fileInput"
        hidden
        multiple
        @change="handleFileChange"
    >

    <div
        v-if="uploadedFiles.length === 0"
        class="flex flex-col items-center justify-center pointer-events-none"
    >
      <div class="flex items-center justify-center mb-4 h-16 w-16 bg-brand-secondary rounded-2xl">
        <LucideCloudUpload :size="32" class="stroke-brand-muted"/>
      </div>

      <h3 class="mb-2 text-lg font-semibold text-brand-foreground">Drag and drop files here</h3>
      <span class="mb-4 text-sm text-brand-muted">or click to browse from your computer</span>

      <div class="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/80 transition-all duration-200 rounded-2xl px-5 py-2.5 mb-4 text-white">
        <LucideFileUp :size="16"/>
        <span class="text-sm font-medium">Upload Files</span>
      </div>

      <span class="text-xs text-brand-muted">Maximum file size: 100 MB</span>
    </div>

    <div
        v-else
        class="w-full text-left cursor-default"
        @click.stop
    >
      <div class="flex items-center justify-between mb-4 border-b border-brand-border/40 pb-2">
        <p class="text-sm font-semibold text-brand-foreground">Selected files ({{ uploadedFiles.length }})</p>
        <button
            @click="uploadedFiles = []"
            class="text-xs text-rose-500 hover:underline cursor-pointer"
        >
          Clear all
        </button>
      </div>

      <ul class="space-y-2 max-h-60 overflow-y-auto pr-1">
        <li
            v-for="file in uploadedFiles"
            :key="file.name"
            class="flex items-center justify-between bg-brand-secondary/40 px-4 py-2.5 rounded-xl border border-brand-border/30"
        >
          <span class="text-sm font-medium text-white truncate max-w-[70%]">{{ file.name }}</span>
          <span class="text-xs text-brand-muted shrink-0">{{ getSize(file.size) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { LucideCloudUpload, LucideFileUp } from '#components'

const isDragging = ref(false)
const uploadedFiles = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const { getSize } = useFilesize();

const triggerFileInput = () => {
  if (uploadedFiles.value.length === 0) {
    fileInput.value?.click()
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    uploadedFiles.value = Array.from(target.files)
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files) {
    uploadedFiles.value = Array.from(files)
  }
}
</script>

<style scoped lang="postcss">

</style>
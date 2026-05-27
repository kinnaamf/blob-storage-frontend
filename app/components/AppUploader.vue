<template>
  <div
      class="relative p-8 cursor-pointer rounded-2xl border-2 border-dashed text-center transition-all duration-200"
      :class="
          isDragging
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
        name="upload"
        ref="fileInput"
        hidden
        multiple
        @change="handleFileChange"
        class="w-full h-full"
    >

    <UploaderDropzone v-if="fileStore.filesToUpload.length === 0"/>

    <div
        v-else
        class="w-full text-left flex flex-col cursor-default"
        @click.stop
    >
      <div class="flex items-center justify-between mb-4 border-b border-brand-border/40 pb-2">
        <p class="text-sm font-semibold text-brand-foreground">Selected files ({{ fileStore.filesToUpload.length }})</p>
        <button
            @click="fileStore.clearFiles()"
            class="text-xs text-rose-500 hover:underline cursor-pointer"
        >
          Clear all
        </button>
      </div>

      <UploaderFileList/>

      <UploaderActions :file-input="fileInput"/>

    </div>

  </div>
</template>

<script lang="ts" setup>

const {
  isDragging,
  triggerFileInput,
  handleFileChange,
  handleDrop,
  fileInput
} = useFileUploader()

const fileStore = useFileStore()
</script>
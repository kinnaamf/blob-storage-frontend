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
        ref="fileInput"
        hidden
        multiple
        @change="handleFileChange"
    >

    <div
        v-if="filesToUpload.length === 0"
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
        class="w-full text-left flex flex-col cursor-default"
        @click.stop
    >
      <div class="flex items-center justify-between mb-4 border-b border-brand-border/40 pb-2">
        <p class="text-sm font-semibold text-brand-foreground">Selected files ({{ filesToUpload.length }})</p>
        <button
            @click="clearFiles"
            class="text-xs text-rose-500 hover:underline cursor-pointer"
        >
          Clear all
        </button>
      </div>

      <ul class="grid grid-cols-4 gap-x-2 gap-y-2 max-h-60 overflow-y-auto pr-1">
        <li
            v-for="file in filesToUpload"
            :key="file.name"
            class="flex flex-col items-center justify-between gap-2 bg-brand-secondary/40 px-4 py-2.5 rounded-xl border border-brand-border/30"
        >
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
            <h3 class="text-xs text-brand-muted shrink-0">
              {{
                `${ getSize(file.size).fileSize }
                 ${ getSize(file.size).storageUnit }`
              }}
          </h3>
          </div>
        </li>
      </ul>

      <button
          @click="storeFiles"
          class="flex justify-between items-center gap-2 self-end w-max px-5 py-1.5 bg-brand-primary hover:bg-brand-primary/80 transition-all duration-200 rounded-2xl mt-4">
        <LucideUpload :size="16"/>
        Store Files
      </button>

    </div>

  </div>
</template>

<script lang="ts" setup>

import { useFileUploader } from "~/composables/useFileUploader";

const { getSize } = useFilesize();

const {
  isDragging,
  isLoading,
  filesToUpload,
  triggerFileInput,
  getFileIcon,
  getFileIconClass,
  getFilePreview,
  handleFileChange,
  handleDrop,
  clearFiles,
  storeFiles,
  normalizeFilename
} = useFileUploader()
</script>
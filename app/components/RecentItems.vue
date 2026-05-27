<template>
  <section class="mt-8">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-brand-foreground">Recent Files</h2>

        <span class="mt-1 text-sm text-brand-muted">{{ filesCount }} files</span>
      </div>
      <div class="flex items-center gap-1 rounded-2xl border border-brand-border bg-brand-secondary p-1">

        <button
            @click="viewMode = 'grid'"
            class="h-8 w-8 flex items-center justify-center rounded-xl"
            :class="viewMode === 'grid' ? 'bg-brand-primary' : ''"
        >
          <LucideGrid3x3 :size="16"
                         :class="viewMode === 'grid' ? '' : 'stroke-brand-muted hover:stroke-brand-foreground transition-all duration-100'"/>
        </button>

        <button
            @click="viewMode = 'list'"
            class="h-8 w-8 flex items-center justify-center rounded-xl"
            :class="viewMode === 'list' ? 'bg-brand-primary' : ''"
        >
          <LucideList :size="16"
                      :class="viewMode === 'list' ? '' : 'stroke-brand-muted hover:stroke-brand-foreground transition-all duration-100'"/>
        </button>
      </div>
    </div>
    <div  v-if="viewMode === 'grid'" class="grid grid-cols-4 gap-4">
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
            {{
              `${ getSize(file.size).fileSize }
               ${ getSize(file.size).storageUnit }`
            }}
          </h3>
        </div>

      </div>
    </div>

    <div
        v-if="viewMode === 'list'"
        class="bg-brand-card rounded-2xl border border-brand-border"
    >
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

    </div>
  </section>
</template>

<script setup lang="ts">
import { useFileStore } from "~/stores/fileUploader";

const filesCount = computed(() => {
  return fileStore.uploadedFiles.length
})

const viewMode = ref<'grid' | 'list'>('grid')

const fileStore = useFileStore()

const { normalizeFilename, getFilePreview, getFileIcon, getFileIconClass, getSize } = useFileUploader()

const hoveredFile = ref<string | null>(null)
</script>

<style scoped lang="postcss">

</style>
<template>
  <div
      v-for="(file, idx) in fileStore.uploadedFiles"
      :key="file.name"
      class="bg-brand-secondary/40 rounded-2xl border border-brand-border p-4 relative"
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
          @click="openPopup(idx)"
          class="h-7 w-7 group
          flex items-center justify-center
          rounded-lg
          hover:bg-brand-secondary transition-all duration-200">
        <LucideEllipsis :size="16"
                        :class="hoveredFile === file.name ? 'stroke-brand-foreground' : 'stroke-brand-muted'"/>
      </button>
    </div>

    <div>
      <h3 class="text-xs text-brand-muted shrink-0">
        {{ `${ getSize(file.size).fileSize } ${ getSize(file.size).storageUnit }` }}
      </h3>
    </div>
    <Transition name="fade-in">
      <AppPopup
          class="absolute bottom-20 right-4 z-20"
          v-if="openedPopupIdx === idx"
          :file="file"
          @close="openedPopupIdx = null"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import AppPopup from "~/components/AppPopup.vue";

const fileStore = useFileStore()
const { normalizeFilename, getFilePreview, getFileIcon, getFileIconClass, getSize } = useFileUploader()

const hoveredFile = ref<string | null>(null)

const {
  openedPopupIdx,
  openPopup
} = usePopup()
</script>

<style scoped>
.fade-in-enter-active, .fade-in-leave-active {
  transition: transform .2s ease-in-out;
}

.fade-in-enter-from {
  transform: scale(0);
  transform-origin: top left;
  transition: transform .2s ease-in-out;

}

.fade-in-leave-to {
  transform: scale(0);
  transform-origin: bottom right;
  transition: transform .2s ease-in-out;
}

</style>
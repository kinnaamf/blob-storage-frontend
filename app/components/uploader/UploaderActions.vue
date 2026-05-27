<template>
  <div class="flex items-center self-end gap-4">
    <button
        @click.stop="fileInput?.click()"
        class="flex justify-between items-center gap-2 self-end w-max px-5 py-1.5 bg-brand-primary hover:bg-brand-primary/80 transition-all duration-200 rounded-2xl mt-4">
      <LucideFileUp :size="16"/>
      Upload More
    </button>
    <button
        @click="fileStore.storeFiles()"
        class="flex justify-between items-center gap-2 self-end w-max px-5 py-1.5 bg-brand-primary hover:bg-brand-primary/80 transition-all duration-200 rounded-2xl mt-4">
      <LucideUpload :size="16"/>
      Store Files
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  fileInput: HTMLInputElement | null;
}>()

const fileStore = useFileStore();

</script>
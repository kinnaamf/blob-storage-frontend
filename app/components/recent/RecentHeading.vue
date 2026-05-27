<template>
  <div>
    <h2 class="text-xl font-semibold text-brand-foreground">Recent Files</h2>

    <span class="mt-1 text-sm text-brand-muted">{{ filesCount }} files</span>
  </div>
</template>

<script setup lang="ts">
const fileStore = useFileStore()

const filesCount = computed(() => {
  return fileStore.uploadedFiles.length
})
</script>
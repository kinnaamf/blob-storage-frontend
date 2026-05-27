<template>


  <div
      class="flex flex-col items-center justify-center pointer-events-none">
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
</template>

<script setup lang="ts">

</script>

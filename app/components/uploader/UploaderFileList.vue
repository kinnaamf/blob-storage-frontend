<template>
  <ul class="grid grid-cols-4 gap-x-2 gap-y-2 max-h-60 overflow-y-auto pr-1">
    <li
        v-for="file in fileStore.filesToUpload"
        :key="file.name"
        class="flex flex-col items-center justify-between gap-2 bg-brand-secondary/40 px-4 py-2.5 rounded-xl border border-brand-border/30">
      <UploaderFileCard :file="file"/>
    </li>
  </ul>
</template>

<script setup lang="ts">

  const fileStore = useFileStore()
</script>
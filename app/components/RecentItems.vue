<template>
  <section class="mt-8">
    <div class="mb-6 flex items-center justify-between">
      <RecentHeading />
      <RecentViewType
          :view-mode="viewMode"
          @view-grid="viewMode = 'grid'"
          @view-list="viewMode = 'list'"
      />
    </div>
    <div v-if="fileStore.uploadedFiles.length > 0">
      <div v-if="viewMode === 'grid'" class="grid grid-cols-4 gap-4">
        <RecentGrid />
      </div>

      <div v-if="viewMode === 'list'" class="bg-brand-card rounded-2xl border border-brand-border">
        <RecentList />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const viewMode = ref<'grid' | 'list'>('grid')

const fileStore = useFileStore()
</script>
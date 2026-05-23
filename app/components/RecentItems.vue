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
  </section>
</template>

<script setup lang="ts">
const filesCount = ref(4)

const viewMode = ref<'grid' | 'list'>('grid')
</script>

<style scoped lang="postcss">

</style>
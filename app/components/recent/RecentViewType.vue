<script setup lang="ts">
defineProps<{
  viewMode: 'grid' | 'list';
}>()

defineEmits<{
  (e: 'viewGrid') : void
  (e: 'viewList') : void
}>()
</script>

<template>
  <div class="flex items-center gap-1 rounded-2xl border border-brand-border bg-brand-secondary p-1">
    <button
        @click="$emit('viewGrid')"
        class="h-8 w-8 flex items-center justify-center rounded-xl"
        :class="viewMode === 'grid' ? 'bg-brand-primary' : ''"
    >
      <LucideGrid3x3 :size="16"
                     :class="viewMode === 'grid' ? '' : 'stroke-brand-muted hover:stroke-brand-foreground transition-all duration-100'"/>
    </button>

    <button
        @click="$emit('viewList')"
        class="h-8 w-8 flex items-center justify-center rounded-xl"
        :class="viewMode === 'list' ? 'bg-brand-primary' : ''"
    >
      <LucideList :size="16"
                  :class="viewMode === 'list' ? '' : 'stroke-brand-muted hover:stroke-brand-foreground transition-all duration-100'"/>
    </button>
  </div>
</template>
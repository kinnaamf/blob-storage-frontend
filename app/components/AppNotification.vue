<template>
  <div class="flex items-center justify-center relative
                  border rounded-2xl
                  p-2 border-brand-border
                  h-10 w-10
                  bg-brand-secondary group hover:bg-brand-secondary/80 transition-colors duration-200">
    <LucideBell :size="20" class="stroke-brand-muted group-hover:stroke-brand-foreground transition-colors duration-200" />
    <div
        v-if="notificationsCount > 0"
        class="flex items-center justify-center
                   absolute -top-1 -right-1
                   h-5 w-5
                   rounded-full
                 bg-brand-primary">
      <span class="text-xs">{{ notificationsCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const notificationsCount = ref<number>(1);
</script>

<style scoped lang="postcss">

</style>
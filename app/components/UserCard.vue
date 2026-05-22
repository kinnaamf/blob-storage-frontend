<template>
  <div class="flex items-center gap-3
                    rounded-2xl border border-brand-border bg-brand-secondary hover:bg-brand-secondary/80 transition-colors duration-200
                  px-3 py-1.5">
        <span class="">
          <img src="https://placehold.co/32" alt="" class="w-8 h-8 rounded-full" />
        </span>
    <div class="flex flex-col">
      <span class="text-sm font-medium text-brand-foreground">{{ userName }}</span>
      <span class="text-xs text-brand-muted">{{ userPlan }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

const userName = ref<string>('John Doe');
const userPlan  = ref<string>('Pro Plan');
</script>

<style scoped lang="postcss">

</style>
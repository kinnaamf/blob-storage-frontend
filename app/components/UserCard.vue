<template>
  <div class="relative">
    <NuxtLink to="/settings" class="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-secondary p-1 transition-colors hover:bg-brand-secondary/80 md:px-3 md:py-1.5">
        <span class="">
          <img
              v-if="avatar"
              :src="avatar"
              alt="https://placehold.co"
              class="aspect-square rounded-full w-8 h-8" />

          <component
              v-else
              :is="LucideCircleUserRound"
              :size="32"
              class="stroke-brand-muted"
          />
        </span>
      <div class="hidden text-left md:block">
        <p class="text-sm font-medium text-brand-foreground">{{ name }}</p>
        <p class="text-xs text-brand-muted">{{ plan }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/user";

import { LucideCircleUserRound } from "#components";

const userStore = useUserStore();
const { name, plan, avatar } = storeToRefs(userStore);
</script>

<style scoped lang="postcss">

</style>
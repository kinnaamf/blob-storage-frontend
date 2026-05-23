<template>
  <div class="flex items-center gap-3
                    rounded-2xl border border-brand-border bg-brand-secondary hover:bg-brand-secondary/80 transition-colors duration-200
                  px-3 py-1.5">
        <span class="">
          <img
              v-if="avatar"
              :src="avatar"
              alt="https://placehold.co"
              class="w-8 h-8 rounded-full" />

          <component
              v-else
              :is="LucideCircleUserRound"
              :size="32"
              class="stroke-brand-muted"
          />
        </span>
    <div class="flex flex-col">
      <span class="text-sm font-medium text-brand-foreground">{{ name }}</span>
      <span class="text-xs text-brand-muted">{{ plan }}</span>
    </div>
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
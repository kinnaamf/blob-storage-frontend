<template>
  <div class="bg-brand-secondary/50 border border-brand-border rounded-2xl p-1 flex gap-2 items-center">
    <NuxtLink
        v-for="tab in tabs"
        :key="tab.link"
        :to="`/settings/${tab.link}`"
        custom
        v-slot="{ isExactActive, navigate }">
      <button
          @click="navigate"
          class="flex items-center gap-2  py-2.5 px-4 rounded-xl transition-all group"
          :class="isExactActive ? 'bg-brand-primary text-brand-foreground shadow-lg' : 'hover:bg-brand-secondary text-brand-muted hover:text-brand-foreground'"
      >
        <component
            class="w-4 h-4 transition-all"
            :class="isExactActive ? 'stroke-brand-foreground ' : 'stroke-brand-muted group-hover:stroke-brand-foreground'"
            :is="tab.icon"
            />
        {{ tab.text }}
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { LucideUser, LucideShield, LucideCreditCard } from "#components";

const tabs = [
  { text: 'Profile', link: '', icon: LucideUser },
  { text: 'Security', link: 'security', icon: LucideShield },
  { text: 'Storage Plan', link: 'storage-plan', icon: LucideCreditCard },
]
</script>
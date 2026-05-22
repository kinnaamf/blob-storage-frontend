<template>
  <nav class="flex-1 space-y-1 px-3 py-4">
    <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        active-class="active"
        class="group nav-link hover:bg-brand-secondary"
    >
      <component
          :is="item.icon"
          :size="20"
          class="stroke-brand-muted group-hover:stroke-brand-foreground group-[.active]:stroke-brand-primary transition-colors duration-200"
      />

      <span class="text-brand-muted group-hover:text-brand-foreground group-[.active]:text-brand-primary transition-colors duration-200">
    {{ item.title }}
      </span>
    </NuxtLink>
  </nav>
</template>

<script lang="ts" setup>
import { LucideFolderOpen, LucideLink2, LucideChartColumn, LucideSettings } from "#components";

interface NavItem {
  title: string
  to: string
  icon: any
}

const navItems: NavItem[] = [
  {
    title: 'All Files',
    to: '/',
    icon: LucideFolderOpen
  },
  {
    title: 'Shared Links',
    to: '/shared-links',
    icon: LucideLink2
  },
  {
    title: 'Storage Analytics',
    to: '/storage-analytics',
    icon: LucideChartColumn
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: LucideSettings
  },
]
</script>

<style scoped lang="postcss">
.active {
  @apply flex items-center gap-3
  w-full rounded-xl px-3 py-2.5
  text-sm font-medium
  transition-colors bg-brand-primary/10 text-brand-primary
  pointer-events-none;
}

.nav-link {
  @apply flex items-center gap-3
  w-full rounded-xl px-3 py-2.5
  text-sm font-medium text-brand-muted
  transition-colors
}
</style>
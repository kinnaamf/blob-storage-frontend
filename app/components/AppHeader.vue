<template>
  <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b gap-2 border-brand-border bg-brand-bg/80 px-4 md:px-6 backdrop-blur-sm">
    <button class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-secondary transition-colors group md:hidden"
            @click="isMenuOpen = true"
    >
      <LucideMenu
          class="stroke-brand-muted group-hover:stroke-brand-foreground transition-all duration-200" :size="20"/>
    </button>
    <AppSearch/>
    <div class="flex shrink-0 items-center gap-2 md:gap-4">
      <AppNotification/>
      <UserCard/>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppSearch from "~/components/AppSearch.vue";
import AppNotification from "~/components/AppNotification.vue";
import UserCard from "~/components/UserCard.vue";
import { LucideMenu } from "#components";
import { useMenu } from "~/composables/useMenu";

const { isMenuOpen } = useMenu()
</script>


<style scoped lang="postcss">

</style>
<template>
  <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-brand-border bg-brand-bg/80 px-6 backdrop-blur-sm">
    <AppSearch/>
    <div class="flex items-center gap-4">
      <AppNotification/>
      <UserCard/>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppSearch from "~/components/AppSearch.vue";
import AppNotification from "~/components/AppNotification.vue";
import UserCard from "~/components/UserCard.vue";


</script>


<style scoped lang="postcss">

</style>
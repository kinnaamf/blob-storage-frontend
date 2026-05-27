<template>
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-brand-foreground">Welcome back, {{ getName }}!</h1>
    <p class="mt-1 text-brand-muted">Manage and organize your files in the cloud</p>
  </div>
  <AppUploader />
<!--  <AppDropdown/>-->
  <RecentItems/>
</template>

<script setup lang="ts">

import AppUploader from "~/components/AppUploader.vue";

const { name } = useUserStore();

const getName = computed(() => {
  return name.split(" ").shift();
})

</script>

<style scoped lang="postcss">

</style>
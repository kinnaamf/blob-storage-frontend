<script setup lang="ts">

import StorageCards from "~/components/storage/StorageCards.vue";
import DataStructureChart from "~/components/storage/DataStructureChart.vue";
import TrafficChart from "~/components/storage/TrafficChart.vue";


</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-brand-foreground">Storage Analytics</h1>
      <p class="mt-1 text-brand-muted">Monitor your storage usage and bandwidth</p>
    </div>

    <StorageCards/>

    <div class="flex justify-between gap-8">
      <div class="card p-6 w-full">
        <h2 class="text-lg font-semibold">Data structure breakdown</h2>
        <DataStructureChart/>
      </div>
      <div class="card p-6 w-full">
        <h2 class="text-lg font-semibold">Bandwidth Traffic</h2>
        <h3 class="mt-6 mb-4 text-sm text-brand-muted">Weekly Overview</h3>
        <TrafficChart/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
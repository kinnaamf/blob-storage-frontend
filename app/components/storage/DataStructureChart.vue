<template>
  <div class="relative h-[11.25rem] w-[11.25rem] mx-auto mb-6 mt-4">
    <Doughnut :data="chartData" :options="chartOptions"/>

    <div class="absolute inset-0 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
      <h2 class="text-3xl text-brand-foreground font-black">{{ getSize(fileStore.getTotalUsedSpace).fileSize }}</h2>
      <span class="text-brand-muted text-sm">{{ getSize(fileStore.getTotalUsedSpace).storageUnit }} Used</span>
    </div>
  </div>
  <div>
    <div>
      <div v-for="item in categories" class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-3 w-3 rounded-full" :class="item.color"></div>
          <component
              :is="item.icon"
              class="w-4 h-4 stroke-brand-muted"
          />
          <span class="text-sm text-brand-foreground">{{ item.name }}</span>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-sm text-brand-foreground">{{ item.size }}</span>
          <span class="text-xs text-brand-muted">{{ item.percentage }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { LucideImage, LucideFilm, LucideFileText, LucideHardDrive } from "#components";

ChartJS.register(ArcElement, Tooltip, Legend)

const categories = [
  {
    name: 'Images', size: '20 GB', percentage: '44.2', color: 'bg-emerald-500', icon: LucideImage
  },
  {
    name: 'Videos', size: '15 GB', percentage: '44.2', color: 'bg-purple-500', icon: LucideFilm
  },
  {
    name: 'Documents', size: '5 GB', percentage: '44.2', color: 'bg-sky-500', icon: LucideFileText
  },
  {
    name: 'Other', size: '5.2 GB', percentage: '44.2', color: 'bg-amber-500', icon: LucideHardDrive
  },
]

const chartData = {
  labels: ['Images', 'Videos', 'Documents', 'Others'],
  datasets: [
    {
      data: [20, 15, 5, 5.2],
      backgroundColor: [
        '#10b981',
        '#a855f7',
        '#3b82f6',
        '#f59e0b',
      ],
      borderWidth: 0,
      cutout: '80%',
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  }
}

const fileStore = useFileStore()
const { getSize } = useFileUploader()
</script>

<style scoped lang="postcss">

</style>
<script setup lang="ts">
</script>
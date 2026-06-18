<template>
  <div class="h-auto w-full">
    <Line :data="chartData" :options="chartOptions"/>
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: '',
    data: [12, 19, 15, 25, 32, 18, 24],
    borderColor: '#5c67f2',
    borderWidth: 3,
    tension: 0.45,
    fill: true,
    backgroundColor: (context: any) => {
      const chart = context.chart;
      const { ctx, chartArea } = chart;

      if (!chartArea) return null;

      const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient.addColorStop(0, 'rgba(92, 103, 242, 0.3)')
      gradient.addColorStop(0.5, 'rgba(92, 103, 242, 0.1)')
      gradient.addColorStop(1, 'rgba(92, 103, 242, 0)')

      return gradient;
    },
    pointBackgroundColor: '#0b0f18',
    pointBorderColor: '#5c67f2',
    pointBorderWidth: 1,


    pointHoverRadius: 8,
    pointHoverBackgroundColor: '#5c67f2',
    pointHoverBorderColor: '#ffffff',
    pointHoverBorderWidth: 2,
  }],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#6b7280',
        font: { size: 12, family: 'sans-serif' },
        padding: 12
      },
      border: {
        display: false,
      }
    },
    y: {
      min: 0,
      max: 32,
      ticks: {
        stepSize: 8,
        color: '#6b7280',
        font: { size: 12, family: 'sans-serif' },
        padding: 16,
        callback: (value: number) => value + ' GB'
      },
      grid: {
        color: '#1f212c',
        drawTicks: false,
      },
      border: {
        dash: [4, 4],
        display: false,
      }
    }
  }
}
</script>

<style scoped lang="postcss">

</style>
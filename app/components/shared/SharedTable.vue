<template>
  <div class="overflow-hidden rounded-xl border border-brand-border bg-card">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
        <tr class="border-b border-brand-border bg-brand-secondary/50">
          <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-brand-muted"
              v-for="(t, i) in tableHead"
            :class="{
                'text-center': i === 3,
                'text-right': i === 4,
                'text-left': i !== 3 && i !== 4
            }"
          >
            {{ t }}
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-brand-border bg-brand-card">
        <tr v-for="file in files" class="group transition-colors hover:bg-brand-secondary/30 w-full h-full">
          <td class="flex gap-3 items-center pl-6 py-4">
            <img
                v-if="file.type.startsWith('image/')"
                :src="getFilePreview(file)"
                @error="(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/36')"
                class="w-9 h-9 rounded-xl object-cover"
                alt="Image not found"
            />

            <div v-else :class="getIconBg(file)" class="p-2 rounded-xl">
              <component
                  :is="getFileIcon(file)"
                  :size="20"
                  :class="getIconColor(file)"
              />
            </div>

            <div class="flex items-center gap-2">
              <span>{{ file.name }}</span>

              <div v-if="file.isPasswordProtected" class="bg-blue-500/50 p-1 rounded-md">
                <LucideLock :size="16" class=" stroke-sky-400 "/>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <span class="text-sm text-brand-muted">{{ file.createdAt }}</span>
          </td>
          <td class="px-6 py-4">
            <span class="text-sm">{{ file.downloadsCount }}</span>
          </td>
          <td class="align-middle px-6">
            <div class="flex items-center justify-center py-1 rounded-2xl"
                 :class="statusBgColor(file.status)">
              <span :class="statusTextColor(file.status)" class="text-xs">{{ file.status }}</span>
            </div>
          </td>
          <td class="px-6 py-4">
            Actions
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SharedLinkFile } from "~/types/file";

const props = defineProps<{
  files: SharedLinkFile[];
}>()

type LogStatus = 'Active' | 'Expiring'

const {
  getFileIcon,
  getSize,
  getFileIconClass,
  getFilePreview,
  normalizeFilename,
  getIconColor,
  getIconBg
} = useFileUploader()
const statusTextColor = (status: LogStatus) => {
  return status === 'Active' ? 'text-emerald-400' : 'text-amber-400'
}

const statusBgColor = (status: LogStatus) => {
  return status === 'Active' ? 'bg-emerald-500/10' : 'bg-amber-500/10'
}

const tableHead = ['File name', 'Created at', 'Downloads', 'Status', 'Actions']

</script>


<style scoped lang="postcss">

</style>
<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-brand-foreground">Shared Links</h1>
      <p class="mt-1 text-brand-muted">Manage your public file sharing links</p>
    </div>

    <div class="grid grid-cols-3 gap-4 mb-8">
      <div class="rounded-2xl border border-brand-border bg-brand-card p-4">
        <p class="text-sm text-brand-muted">Total Links</p>
        <p class="mt-1 text-2xl font-bold text-foreground">Count</p>
      </div>

      <div class="rounded-2xl border border-brand-border bg-brand-card p-4">
        <p class="text-sm text-brand-muted">Total Downloads</p>
        <p class="mt-1 text-2xl font-bold text-foreground">Count</p>
      </div>

      <div class="rounded-2xl border border-brand-border bg-brand-card p-4">
        <p class="text-sm text-brand-muted">Expiring soon</p>
        <p class="mt-1 text-2xl font-bold text-amber-500">Count</p>
      </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-brand-border bg-card">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
          <tr class="border-b border-brand-border bg-brand-secondary/50">
            <th class="pl-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-muted">
              File Name
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Created at
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Downloads
            </th>
            <th class="text-center text-xs font-semibold uppercase tracking-wider text-brand-muted align-middle">
              Status
            </th>
            <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Actions
            </th>
          </tr>
          </thead>
          <tbody class="divide-y divide-brand-border bg-brand-card">
          <tr v-for="file in mockSharedLinks" class="group transition-colors hover:bg-brand-secondary/30 w-full h-full">
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
            <td class="align-middle">
              <div class="flex items-center justify-center py-1 w-full rounded-2xl px-1"
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
  </div>
</template>

<script setup lang="ts">
import type { SharedLinkFile } from "~/types/file";

const fileStore = useFileStore()
const { getFileIcon, getSize, getFileIconClass, getFilePreview, normalizeFilename, getIconColor, getIconBg } = useFileUploader()

const mockSharedLinks: SharedLinkFile[] = [
  {
    id: '1',
    name: 'Q4_Financial_Report.pdf',
    type: 'application/pdf',
    createdAt: 'Dec 15, 2024',
    downloadsCount: 47,
    status: 'Active',
    isPasswordProtected: true,
  },
  {
    id: '2',
    name: 'Product_Launch_Photos.zip',
    type: 'application/zip',
    createdAt: 'Dec 12, 2024',
    downloadsCount: 128,
    status: 'Expiring',
    expiresIn: '2 days',
    isPasswordProtected: false,
  },
  {
    id: '3',
    name: 'Brand_Guidelines_2024.pdf',
    type: 'application/pdf',
    createdAt: 'Dec 10, 2024',
    downloadsCount: 89,
    status: 'Active',
    isPasswordProtected: false,
  },
  {
    id: '4',
    name: 'Team_Offsite_Video.mp4',
    type: 'video/mp4',
    createdAt: 'Dec 8, 2024',
    downloadsCount: 34,
    status: 'Expiring',
    expiresIn: '5 hours',
    isPasswordProtected: true,
  },
  {
    id: '5',
    name: 'Marketing_Assets.zip',
    type: 'application/zip',
    createdAt: 'Dec 5, 2024',
    downloadsCount: 256,
    status: 'Active',
    isPasswordProtected: false,
  },
  {
    id: '6',
    name: 'Hero_Banner.jpg',
    type: 'image/jpeg',
    createdAt: 'Dec 1, 2024',
    downloadsCount: 512,
    status: 'Active',
    isPasswordProtected: false,
  }
]

const tableHead = ['File name', 'Created at', 'Downloads', 'Status', 'Actions']

type LogStatus = 'Active' | 'Expiring'

const statusTextColor = (status: LogStatus) => {
  return status === 'Active' ? 'text-emerald-400' : 'text-amber-400'
}

const statusBgColor = (status: LogStatus) => {
  return status === 'Active' ? 'bg-emerald-500/10' : 'bg-amber-500/10'
}
</script>


<style scoped lang="postcss">

</style>
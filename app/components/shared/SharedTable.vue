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
        <tr class="group transition-colors hover:bg-brand-secondary/30 w-full h-full"
            v-for="file in files"
            :key="file.name"
        >
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
            <div class="flex items-center justify-end gap-2">
              <button class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all"
                      @click="copyLink(file)"
                      :class="copiedFileId === file.id ? 'bg-emerald-500/10 hover:bg-emerald-500/20' : 'bg-brand-primary/10 hover:bg-brand-primary/20'"

              >
                <component
                    :is="copiedFileId === file.id ? LucideExternalLink : LucideCopy"
                    :class="copiedFileId === file.id ? 'stroke-emerald-500' : 'stroke-brand-primary'"
                    :size="16"
                />
                <span
                    class="font-medium"
                    :class="copiedFileId === file.id ? 'text-emerald-500' : 'text-brand-primary'"
                >
                  {{ copiedFileId === file.id ? 'Copied!' : 'Copy Link' }}
                </span>
              </button>

              <button class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all bg-brand-destructive/10 hover:bg-brand-destructive/20">
                <LucideTrash
                    class="stroke-brand-destructive"
                    :size="16"/>
                <span class="text-brand-destructive">Revoke Link</span>
              </button>

              <button class="group hover:bg-brand-muted/10 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all">
                <LucideEllipsis
                    :size="16"
                    class="stroke-brand-muted transition-all duration-200 group-hover:stroke-brand-foreground"
                />
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SharedLinkFile } from "~/types/file";
import { LucideExternalLink, LucideCopy } from "#components"

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

const copiedFileId = ref<string | null>(null)

const copyLink = async (file: SharedLinkFile) => {
  try {
    const baseUrl = window.location.origin

    const shareToken = file.id || 'random-share-token'
    const fullShareUrl = `${ baseUrl }/share/${ shareToken }`

    await navigator.clipboard.writeText(fullShareUrl)

    copiedFileId.value = file.id

    setTimeout(() => {
      copiedFileId.value = null
    }, 4000)
  } catch (e) {
    console.error(e)
  }
}
</script>


<style scoped lang="postcss">

</style>
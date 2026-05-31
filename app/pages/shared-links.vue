<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-brand-foreground">Shared Links</h1>
      <p class="mt-1 text-brand-muted">Manage your public file sharing links</p>
    </div>

    <SharedCards :links="mockSharedLinks"/>

    <SharedTable :files="mockSharedLinks"/>
  </div>
</template>

<script setup lang="ts">
import type { SharedLinkFile } from "~/types/file";
import SharedCards from "~/components/shared/SharedCards.vue";
import SharedTable from "~/components/shared/SharedTable.vue";

const fileStore = useFileStore()

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



</script>


<style scoped lang="postcss">

</style>
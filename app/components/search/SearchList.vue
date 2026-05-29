<template>
  <div class="flex flex-col gap-1 z-10">
    <div
        v-for="file in searchFiles"
        :key="file?.name || Math.random()"
        class=" p-2  rounded-xl transition-colors duration-100 hover:bg-brand-secondary cursor-pointer ">
      <div v-if="file">
        <SearchCard :file="file"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchCard from "~/components/search/SearchCard.vue";

defineProps<{
  searchFiles: any[]
}>()
</script>
<template>
  <div class="relative w-full max-w-md">
    <div ref="searchContainer">
      <LucideSearch
          class="absolute top-3 left-3 stroke-brand-muted"
          :size="16"
      />
      <input
          ref="inputRef"
          class="h-10 pl-10 w-full
        text-sm placeholder:text-brand-muted text-white
        bg-brand-secondary rounded-2xl border border-brand-border
        outline-none focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
          type="text"
          placeholder="Search files, folders..."
          v-model="searchInput"
          @focus="isFocused = true"
          @input="isTyping = true"
      >
    </div>

    <div v-if="isFocused && isTyping"
         class="absolute top-12 z-10 bg-brand-popover/90 backdrop-blur-sm rounded-2xl p-2 border border-brand-border w-full">
      <p class="px-2 uppercase tracking-wider text-xs font-semibold"
          :class="searchFiles.length > 0 ? 'mb-2 text-brand-muted' : 'text-brand-foreground'"
      >
        {{ searchFiles.length > 0 ? 'Files found' : 'No results found' }}
      </p>

      <SearchList :search-files="searchFiles"/>

    </div>
  </div>

</template>

<script setup lang="ts">
import SearchList from "~/components/search/SearchList.vue";

const fileStore = useFileStore()

watch(fileStore.uploadedFiles, (newFiles) => {
  console.log(newFiles)
}, { immediate: true })

const searchInput = ref<string>('')

const searchFiles = computed(() => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) return []

  return fileStore.uploadedFiles.filter((file) =>
      file.name.toLowerCase().includes(query))
})

const isFocused = ref<boolean>(false)
const isTyping = ref<boolean>(false)

const searchContainer = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target as Node)) {
    isFocused.value = false
    inputRef.value?.blur()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
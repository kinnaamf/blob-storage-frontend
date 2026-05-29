<template>
  <div class="relative w-full max-w-md">
    <div ref="searchContainer">
      <LucideSearch
          class="absolute top-3 left-3 stroke-brand-muted"
          :size="16"
      />
      <input
          ref="inputRef"
          class="app-input"
          type="text"
          placeholder="Search files, folders..."
          v-model="searchInput"
          @focus="isFocused = true"
          @input="isTyping = true"
      >
    </div>

    <Transition name="slide-in">
      <div v-if="isFocused && isTyping"
           class="absolute top-12 z-10 bg-brand-popover/90 backdrop-blur-sm rounded-2xl p-2 border border-brand-border w-full">
        <p class="px-2 uppercase tracking-wider text-xs font-semibold"
           :class="searchFiles.length > 0 ? 'mb-2 text-brand-muted' : 'text-brand-foreground'"
        >
          {{ searchFiles.length > 0 ? 'Files found' : 'No results found' }}
        </p>

        <SearchList :search-files="searchFiles"/>

        <div class="my-2 h-px w-full rounded-full bg-brand-muted/50"></div>

        <p class="px-2 uppercase tracking-wider text-xs font-semibold mb-2 text-brand-muted">
          Quick Actions
        </p>

        <div
            @click="triggerFileInput"
            class="flex items-center gap-3 p-2 w-full transition-all duration-200 rounded-xl group hover:bg-brand-secondary cursor-pointer">
          <div class="w-9 h-9 bg-brand-secondary flex items-center justify-center rounded-xl group-hover:bg-brand-foreground/10">
            <LucideUpload :size="16" class="stroke-brand-muted transition-all duration-200 group-hover:stroke-brand-muted/50"/>
          </div>
          <input
              type="file"
              id="upload"
              name="upload"
              ref="fileInput"
              hidden
              multiple
              @change="handleFileChange"
              class="w-full h-full"
          >
          <span class="text-sm text-brand-foreground">
          Upload new file
        </span>
        </div>
      </div>
    </Transition>
  </div>

</template>

<script setup lang="ts">
import SearchList from "~/components/search/SearchList.vue";

const fileStore = useFileStore()
const { handleFileChange, fileInput } = useFileUploader()

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

const triggerFileInput = () => {
  fileInput.value?.click()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
  .app-input {
    @apply h-10 pl-10 w-full
    text-sm placeholder:text-brand-muted text-white
    bg-brand-secondary rounded-2xl border border-brand-border
    outline-none focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary;
  }

  .slide-in-enter-from,
  .slide-in-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
  }

  .slide-in-enter-active,
  .slide-in-leave-active {
    transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
</style>
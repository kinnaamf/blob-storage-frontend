import { LucideCloudUpload, LucideFileUp, LucideFileText, LucideFolderClosed, LucideVideo, LucideFileCode, LucideFile } from '#components'

export const useFileUploader = () => {
  const isDragging = ref<boolean>(false)
  const isLoading = ref<boolean>(false)

  const filesToUpload = ref<File[]>([])
  const fileInput = ref<HTMLInputElement | null>(null)

  const triggerFileInput = () => {
    if (filesToUpload.value.length === 0) {
      fileInput.value?.click()
    }
  }

  const handleFileChange = (event: Event) => {
    isLoading.value = true

    const target = event.target as HTMLInputElement
    if (target.files) {
      filesToUpload.value = Array.from(target.files)
    }

    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }

  const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    isLoading.value = true

    const files = event.dataTransfer?.files
    if (files && filesToUpload.value.length != 0) {
      filesToUpload.value.push(files)
    } else {
      filesToUpload.value = Array.from(files)
    }

    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }

  const getFileIcon = (file: File) => {
    const name = file.name.toLowerCase()

    if (name.endsWith('.pdf')) return LucideFileText
    if (name.endsWith('.zip') || name.endsWith('.rar') || name.endsWith('.7z')) return LucideFolderClosed
    if (name.endsWith('.mov') || name.endsWith('.mp4') || name.startsWith('video/')) return LucideVideo
    if (name.endsWith('.json') || name.endsWith('.js') || name.endsWith('.ts') || name.endsWith('.html')) return LucideFileCode

    return LucideFile
  }

  const getFileIconClass = (file: File) => {
    return 'stroke-blue-500'
  }

  const getFilePreview = (file: File) => {
    if (!import.meta.client) return ''

    try {
      return URL.createObjectURL(file)
    } catch (e) {
      console.log(e);
      return ''
    }
  }

  const clearFiles = () => {
    filesToUpload.value = []
  }

  const storeFiles = () => {
    console.log(filesToUpload.value)
  }

  const normalizeFilename = (filename: string) => {
    const lastExt = filename.lastIndexOf('.')

    let ext = filename.slice(lastExt)

    const finalName = ref<string>('')

    if (filename.length <= 14) return filename
    else {
      let subfilename = filename.slice(0, 11)
      finalName.value = `${subfilename}...`
    }

    console.log(finalName.value)
    console.log(ext)

    return {
      filename: finalName.value,
      extension: ext
    }
  }

  return {
    isDragging,
    isLoading,
    filesToUpload,
    fileInput,
    triggerFileInput,
    getFileIcon,
    getFileIconClass,
    getFilePreview,
    handleFileChange,
    handleDrop,
    clearFiles,
    storeFiles,
    normalizeFilename
  }

}
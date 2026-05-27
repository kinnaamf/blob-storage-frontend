import { LucideFile, LucideFileCode, LucideFileText, LucideFolderClosed, LucideVideo } from '#components'
import { useFileStore } from "~/stores/fileUploader";

export const useFileUploader = () => {
  const isDragging = ref<boolean>(false)
  const isLoading = ref<boolean>(false)

  const fileStore = useFileStore()

  const fileInput = ref<HTMLInputElement | null>(null)

  const triggerFileInput = () => {
    if (fileStore.filesToUpload.length === 0) {
      fileInput.value?.click()
    }
  }

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files) {
      fileStore.processFiles(target.files)
    }
  }


  const handleDrop = (event: DragEvent) => {
    isDragging.value = false

    const files = event.dataTransfer?.files

    if (files) {
      fileStore.processFiles(files)
    }
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

  const normalizeFilename = (filename: string) => {
    const lastExt = filename.lastIndexOf('.')

    if (filename.length <= 14) {
      return filename
    }

    if (lastExt === -1) {
      return `${ filename.slice(0, 11) }...`
    }

    const name = filename.slice(0, lastExt)
    const ext = filename.slice(lastExt)

    return `${ name.slice(0, 11) }...${ ext }`
  }

  const getExtension = (filename: string): string => {
    const lastExt = filename.lastIndexOf('.')

    if (lastExt === -1) return ''

    return filename.slice(lastExt).toLowerCase()
  }

  return {
    isDragging,
    isLoading,
    fileInput,
    triggerFileInput,
    getFileIcon,
    getFileIconClass,
    getFilePreview,
    handleFileChange,
    handleDrop,
    normalizeFilename,
  }

}
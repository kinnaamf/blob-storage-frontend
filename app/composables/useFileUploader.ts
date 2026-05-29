import { LucideFile, LucideFileCode, LucideFileText, LucideFolderArchive, LucideVideo, LucideFileHeadphone } from '#components'
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

    if (name.endsWith('.pdf') || name.endsWith('.docx') || name.endsWith('.doc') || name.endsWith('.html')) return LucideFileText
    if (name.endsWith('.zip') || name.endsWith('.rar') || name.endsWith('.7z')) return LucideFolderArchive
    if (name.endsWith('.mov') || name.endsWith('.mp4') || name.startsWith('video/')) return LucideVideo
    if (name.endsWith('.json') || name.endsWith('.js') || name.endsWith('.ts') || name.endsWith('.html') || name.endsWith('.cpp') || name.endsWith('.c')) return LucideFileCode
    if (name.endsWith('.wav') || name.endsWith('.mp3') || name.endsWith('.ogg') || name.startsWith('audio/')) return LucideFileHeadphone

    return LucideFile
  }

  const getFileIconClass = (file: File) => {
    switch (getFileIcon(file)) {
      case LucideFileText: return 'bg-rose-500/50 stroke-rose-400'
      case LucideVideo: return 'stroke-brand-primary'
      case LucideFolderArchive: return 'bg-amber-500/50 stroke-amber-400'
      case LucideFileHeadphone: return 'bg-cyan-500/50 stroke-cyan-400'

      default: return 'bg-blue-500/50 stroke-sky-400'
    }

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

    const name = lastExt !== -1 ? filename.slice(0, lastExt) : filename
    const ext = lastExt !== -1 ? filename.slice(lastExt) : ''

    const counterMatch = name.match(/\s\(\d+\)$/)

    if (counterMatch) {
      const counterStr = counterMatch[0]

      const maxNameLen = 11 - counterStr.length
      const cleanName = name.slice(0, Math.max(5, maxNameLen))

      return `${cleanName}...${counterStr}${ext}`
    }

    return `${name.slice(0, 11)}...${ext}`
  }

  const getExtension = (filename: string): string => {
    const lastExt = filename.lastIndexOf('.')

    if (lastExt === -1) return ''

    return filename.slice(lastExt).toLowerCase()
  }

  const getSize = (filesize: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let iteration = 0

    if (filesize === 0) {
      return {
        fileSize: 0,
        storageUnit: 'B'
      }
    }

    while (filesize >= 1024 && iteration < units.length - 1) {
      filesize /= 1024
      iteration++
    }

    const formattedSize = iteration === 0
      ? filesize
      : Math.round(filesize * 10) / 10

    return {
      fileSize: formattedSize,
      storageUnit: units[iteration],
    }
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
    getSize
  }

}
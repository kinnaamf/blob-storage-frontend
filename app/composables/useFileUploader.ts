import { LucideFile, LucideFileCode, LucideFileText, LucideFolderClosed, LucideVideo } from '#components'

export const useFileUploader = () => {
  const isDragging = ref<boolean>(false)
  const isLoading = ref<boolean>(false)

  const filesToUpload = ref<File[]>([])
  const uploadedFiles = ref<File[]>([])
  const fileInput = ref<HTMLInputElement | null>(null)

  const triggerFileInput = () => {
    if (filesToUpload.value.length === 0) {
      fileInput.value?.click()
    }
  }

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files) {
      processFiles(target.files)
    }
  }

  const processFiles = (files: FileList) => {
    const MAX_SIZE = 100 * 1024 * 1024
    const newFiles = Array.from(files)

    const FORBIDDEN_EXTENSTIONS = ['.sh', '.exe']

    const hasForbiddenFile = newFiles.some(file => {
      const ext = getExtension(file.name)
      return FORBIDDEN_EXTENSTIONS.includes(ext)
    })

    if (hasForbiddenFile) {
      alert('Forbidden extensions are not allowed')
      return
    }

    const alreadyUploadedSize = filesToUpload.value.reduce((sum, file) => sum + file.size, 0)
    const newFilesSize = newFiles.reduce((sum, file) => sum + file.size, 0)

    if (alreadyUploadedSize + newFilesSize > MAX_SIZE) {
      alert('Total size of files reaches upload limit')
      return
    }

    const alreadyUploadedNames = filesToUpload.value.map(file => file.name)

    const uniqueNewFiles = newFiles.filter(file => !alreadyUploadedNames.includes(file.name))



    filesToUpload.value.push(...uniqueNewFiles)
  }

  const handleDrop = (event: DragEvent) => {
    isDragging.value = false

    const files = event.dataTransfer?.files

    if (files) {
      processFiles(files)
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

  const clearFiles = () => {
    filesToUpload.value = []
  }

  const storeFiles = () => {
    uploadedFiles.value.push(...filesToUpload.value)

    // console.log(uploadedFiles.value)

    filesToUpload.value = []
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
    normalizeFilename,
    uploadedFiles
  }

}
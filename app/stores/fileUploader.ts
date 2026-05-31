import { defineStore } from "pinia";
import type { UploadedFile } from "@/types/file"

export const useFileStore = defineStore("fileStore", () => {
  const filesToUpload = ref<UploadedFile[]>([])
  const uploadedFiles = ref<UploadedFile[]>([])

  const GB_FACTOR = ref<number>(1024 ** 3)
  const TOTAL_AVAILABLE_SPACE = ref<number>(10 * GB_FACTOR.value)

  const { getSize } = useFileUploader()

  const getExtension = (filename: string): string => {
    const lastExt = filename.lastIndexOf(".");
    if (lastExt === -1) return ''
    return filename.slice(lastExt).toLowerCase()
  }

  const processFiles = (files: FileList) => {
    const MAX_SIZE = 100 * 1024 * 1024
    const newFiles = Array.from(files)

    const FORBIDDEN_EXTENSIONS = ['.sh', '.exe']
    const hasForbiddenFile = newFiles.some(file => {
      const extension = getExtension(file.name)
      return FORBIDDEN_EXTENSIONS.includes(extension)
    })

    if (hasForbiddenFile) {
      alert('Forbidden extension')
      return
    }

    const alreadyUploadedSize = filesToUpload.value.reduce((sum, file) => sum + file.size, 0);
    const newFilesSize = newFiles.reduce((sum, file) => sum + file.size, 0);

    const processedFiles = newFiles.map(file => {
      let currentName = file.name
      const lastDot = file.name.lastIndexOf('.')

      const nameWithoutExtension = lastDot !== -1 ? currentName.slice(0, lastDot) : currentName
      const extension = lastDot !== -1 ? currentName.slice(lastDot) : ''

      let counter = 1

      const isNameTaken = (name: string): boolean => {
        const inBuffer = filesToUpload.value.some(f => f.name === name)
        const inStored = uploadedFiles.value.some(f => f.name === name)

        return inBuffer || inStored
      }

      while (isNameTaken(currentName)) {
        currentName = `${ nameWithoutExtension } (${ counter })${ extension }`
        counter++
      }

      if (currentName !== file.name) {
        return new File([file], currentName, { type: file.type })
      }

      return file
    })

    if (alreadyUploadedSize + newFilesSize > MAX_SIZE) {
      alert('Total size of files reaches upload limit')
      return
    }

    filesToUpload.value.push(...processedFiles)
  }

  const storeFiles = () => {
    uploadedFiles.value.push(...filesToUpload.value)
    filesToUpload.value = []
  }

  const clearFiles = () => {
    return filesToUpload.value = []
  }

  const getTotalUsedSpace = computed(() => {
    return uploadedFiles.value.reduce((sum, file) => sum + file.size, 0);
  })

  const getRemainingSpace = computed(() => {
    return TOTAL_AVAILABLE_SPACE.value - getTotalUsedSpace.value
  })

  const formattedUsedSpace = computed(() => {
    const { fileSize, storageUnit } = getSize(getTotalUsedSpace.value)
    return `${fileSize} ${storageUnit}`
  })

  const sharedFiles = computed(() => uploadedFiles.value.filter(file => file.isShared))

  return {
    filesToUpload,
    uploadedFiles,
    clearFiles,
    getExtension,
    processFiles,
    storeFiles,
    GB_FACTOR,
    TOTAL_AVAILABLE_SPACE,
    getTotalUsedSpace,
    formattedUsedSpace,
    getRemainingSpace,
    sharedFiles
  }
})
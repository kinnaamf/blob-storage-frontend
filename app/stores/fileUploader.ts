import { defineStore } from "pinia";

export const useFileStore = defineStore("fileStore", () => {
  const filesToUpload = ref<File[]>([])
  const uploadedFiles = ref<File[]>([])

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

    if (alreadyUploadedSize + newFilesSize > MAX_SIZE) {
      alert('Total size of files reaches upload limit')
      return
    }

    const alreadyUploadedNames = filesToUpload.value.map(file => file.name)

    const uniqueNewFiles = newFiles.filter(file => !alreadyUploadedNames.includes(file.name))

    filesToUpload.value.push(...uniqueNewFiles)
  }

  const storeFiles = () => {
    uploadedFiles.value.push(...filesToUpload.value)
    filesToUpload.value = []
  }

  const clearFiles = () => {
    return filesToUpload.value = []
  }

  return {
    filesToUpload,
    uploadedFiles,
    clearFiles,
    getExtension,
    processFiles,
    storeFiles,
  }
})
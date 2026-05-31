interface UploadedFile {
  name: string
  size: number
  type: string
  isShared? : boolean
  downloadsCount?: number
  expiresAt?: string | null
}
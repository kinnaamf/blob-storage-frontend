export interface UploadedFile {
  name: string
  size: number
  type: string
  isShared? : boolean
  downloadsCount?: number
  expiresAt?: string | null
}

export interface SharedLinkFile {
  id: string
  name: string
  type: string
  createdAt: string
  downloadsCount: number
  status: 'Active' | 'Expiring'
  expiresIn?: string
  isPasswordProtected: boolean
}
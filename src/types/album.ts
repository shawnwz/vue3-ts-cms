import { Media } from '@/types/media'

export interface Album {
  id: number
  code: string
  media: Media[]
  created: string
  lastModified: string
}

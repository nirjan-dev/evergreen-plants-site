import { BACKEND_URL } from '../constants'

export function getProductImageLink(filename: string, id: string) {
  return `${BACKEND_URL}/api/files/products/${id}/${filename}`
}

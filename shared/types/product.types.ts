export interface BaseProduct {
  id: string
  name: string
  price: number
  description?: string
  image: string
  title: string
  stock: number
  is_featured?: boolean
  is_new?: boolean
  gallery?: string[]
  slug: string
}

export interface Product extends BaseProduct {
  imageLink: string
}

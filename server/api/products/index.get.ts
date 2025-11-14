import pbClient from '~~/server/utils/pb'

interface Product {
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

export default defineEventHandler(async () => {
  try {
    const pageResult = await pbClient.collection<Product>('products').getFullList()
    return {
      statusCode: 200,
      products: pageResult,
    }
  }
  catch (e) {
    console.error(e)
    throw createError({
      message: 'error fetching products',
      statusCode: 500,
    })
  }
})

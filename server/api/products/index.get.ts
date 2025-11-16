import { getPbClient } from '~~/server/utils/pb'
import type { BaseProduct } from '~~/shared/types/product.types'
import { getProductImageLink } from '~~/shared/utils/image'

export default defineEventHandler(async () => {
  try {
    const pbClient = await getPbClient()
    const pageResult = await pbClient.collection<BaseProduct>('products').getFullList()

    if (!pageResult) {
      throw createError({
        message: 'no products found',
        statusCode: 404,
      })
    }

    return {
      statusCode: 200,
      products: pageResult.map(product => ({
        ...product,
        imageLink: getProductImageLink(product.image, product.id),
      })),
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

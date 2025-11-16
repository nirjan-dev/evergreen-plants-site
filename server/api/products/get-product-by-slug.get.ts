import { getPbClient } from '~~/server/utils/pb'
import type { BaseProduct } from '~~/shared/types/product.types'
import { getProductImageLink } from '~~/shared/utils/image'

export default defineEventHandler(async (event) => {
  const { slug } = getQuery(event)

  if (!slug) {
    throw createError({
      message: 'no slug provided',
      statusCode: 400,
    })
  }

  try {
    const pbClient = await getPbClient()
    const pageResult = await pbClient.collection<BaseProduct>('products').getFirstListItem(`slug="${slug}"`)
    if (!pageResult) {
      throw createError({
        message: 'no product found',
        statusCode: 404,
      })
    }

    return {
      statusCode: 200,
      product: {
        ...pageResult,
        imageLink: getProductImageLink(pageResult.image, pageResult.id),
      },
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

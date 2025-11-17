import { createError, defineEventHandler, readMultipartFormData, setResponseStatus } from 'h3'
import { z } from 'zod'
import { getPbClient } from '~~/server/utils/pb'

// This schema validates the JSON data we expect in the 'order' part of the multipart form data.
// It includes both the customer details from the form and the cart details.
const orderSchema = z.object({
  name: z.string('Name is required.').min(1, 'Name is required.'),
  phoneNumber: z.string('Phone number is required.').min(10, 'A valid phone number is required.'),
  location: z.string(),
  customLocation: z.string().optional(),
  email: z.email('Invalid email address.').optional().or(z.literal('')),
  paymentMethod: z.enum(['pay-later', 'payment-proof']),

  // Cart details that must be sent from the frontend
  cartItems: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
    image: z.string(),
  })).min(1, 'Cannot place an order with an empty cart.'),

  totalPrice: z.number(),
  deliveryCost: z.number(),
  totalPriceWithDelivery: z.number(),
})

export default defineEventHandler(async (event) => {
  try {
    const parts = await readMultipartFormData(event)

    if (!parts) {
      throw createError({ statusCode: 400, message: 'Invalid form data.' })
    }

    // Find the 'order' data part, which should be a JSON string
    const orderDataPart = parts.find(p => p.name === 'order')
    if (orderDataPart === undefined || typeof orderDataPart.data !== 'object') {
      throw createError({ statusCode: 400, message: 'Order data is missing.' })
    }

    // Parse and validate the order data against our schema
    // eslint-disable-next-line ts/no-unsafe-assignment, ts/no-unsafe-argument, ts/no-unsafe-call, ts/no-unsafe-member-access
    const orderPayload = JSON.parse(orderDataPart.data.toString())

    const validation = await orderSchema.safeParseAsync(orderPayload)

    if (validation.error) {
      const errors = validation.error.issues
      throw createError({
        statusCode: 400,
        message: 'Invalid data provided.',
        data: errors,
        cause: validation.error.cause,
      })
    }

    const {
      name,
      phoneNumber,
      location,
      customLocation,
      email,
      cartItems,
      totalPriceWithDelivery,
    } = validation.data

    const pb = await getPbClient()
    const pbFormData = new FormData()

    // Append customer and order details
    pbFormData.append('customer_name', name)
    pbFormData.append('customer_phone', phoneNumber)
    pbFormData.append('location', location)
    if (typeof customLocation === 'string') {
      pbFormData.append('custom_location', customLocation)
    }
    if (typeof email === 'string') {
      pbFormData.append('customer_email', email)
    }

    const orderDetails = {
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        item_total: item.price * item.quantity,
      })),
    }

    pbFormData.append('order_details', JSON.stringify(orderDetails))
    pbFormData.append('total', String(totalPriceWithDelivery))
    pbFormData.append('items', String(cartItems.reduce((sum, item) => sum + item.quantity, 0)))
    pbFormData.append('status', 'unconfirmed')

    // Find and append the payment proof file if it exists
    const paymentProofPart = parts.find(p => p.name === 'paymentProof' && (typeof p.filename === 'string'))
    if (paymentProofPart) {
      const fileBlob = new Blob([paymentProofPart.data], { type: paymentProofPart.type })
      pbFormData.append('payment_proof', fileBlob, paymentProofPart.filename)
    }

    const response = await pb.collection('orders').create(pbFormData)

    setResponseStatus(event, 201)
    return {
      message: 'Order created successfully!',
      data: response,
    }
  }
  catch (error: unknown) {
    // Re-throw H3 errors to let Nitro handle them
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error
    }

    // Log unexpected errors for debugging
    console.error('Error creating order:', error)

    // Send a generic 500 error for all other cases
    throw createError({
      statusCode: 500,
      message: 'An unexpected error occurred while processing your order.',
    })
  }
})

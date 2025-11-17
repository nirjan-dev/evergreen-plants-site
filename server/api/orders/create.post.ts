// import { z } from 'zod'
// import { getPbClient } from '../../utils/pb'

// Define Zod schema for validating the incoming form data.
// Note: All values from FormData are initially strings.
// const OrderSchema = z.object({
//   name: z.string().min(3, 'Name must be at least 3 characters'),
//   phoneNumber: z.string().min(10, 'Please enter a valid 10-digit phone number'),
//   location: z.enum(['Inside Ring Road', 'Outside Ring Road']),
//   email: z.string().email('Invalid email address').optional().or(z.literal('')),
//   paymentMethod: z.enum(['payment-proof', 'pay-later']),
//   preferredContactMethod: z.enum(['WhatsApp', 'Phone Call', 'TikTok', 'Instagram']),
//   cartItems: z.string().transform(val => JSON.parse(val)), // The cart items will be a JSON string
//   totalPrice: z.string().transform(val => Number(val)), // Total price will be a string
// })

export default defineEventHandler(async (_event) => {
  // const multipartData = await readMultipaRtFormData(event)

  // if (!multipartData) {
  //   throw createError({ statusCode: 400, statusMessage: 'Missing form data.' })
  // }

  // // Prepare an object to hold the form fields and a variable for the file.
  // const rawData: Record<string, string> = {}
  // let paymentProofFile: Blob | undefined
  // let paymentProofFilename: string | undefined

  // // Iterate over multipart data to separate files from fields.
  // for (const part of multipartData) {
  //   const name = part.name
  //   if (!name)
  //     continue

  //   if (part.filename) {
  //     // This part is a file
  //     if (name === 'paymentProof') {
  //       paymentProofFile = new Blob([part.data], { type: part.type })
  //       paymentProofFilename = part.filename
  //     }
  //   }
  //   else {
  //     // This part is a regular form field
  //     rawData[name] = part.data.toString()
  //   }
  // }

  // // Validate the text-based fields using Zod.
  // const validation = OrderSchema.safeParse(rawData)

  // if (!validation.success) {
  //   // If validation fails, throw a structured error.
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'Invalid order data.',
  //     data: validation.error.flatten().fieldErrors,
  //   })
  // }

  // const { paymentMethod } = validation.data

  // // Manually validate that the payment proof file exists if that payment method was chosen.
  // if (paymentMethod === 'payment-proof' && !paymentProofFile) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'Payment proof is required.',
  //     data: { paymentProof: ['Please upload a screenshot of your payment.'] },
  //   })
  // }

  // try {
  //   const pb = await getPbClient()

  //   // We must use FormData to create a record in PocketBase when a file is included.
  //   const pbFormData = new FormData()

  //   // Append the validated data to the FormData object for PocketBase.
  //   // The field names here must match the collection schema in your PocketBase.
  //   pbFormData.append('customer_name', validation.data.name)
  //   pbFormData.append('customer_phone', validation.data.phoneNumber)
  //   pbFormData.append('customer_location', validation.data.location)
  //   pbFormData.append('customer_email', validation.data.email || '')
  //   pbFormData.append('preferred_contact_method', validation.data.preferredContactMethod)
  //   pbFormData.append('payment_method', validation.data.paymentMethod)
  //   pbFormData.append('total_price', validation.data.totalPrice.toString())
  //   pbFormData.append('order_items', JSON.stringify(validation.data.cartItems))
  //   pbFormData.append('status', 'pending') // Set the initial order status.

  //   // If a payment proof file was uploaded, append it to the form data.
  //   if (paymentProofFile && paymentProofFilename) {
  //     pbFormData.append('payment_proof', paymentProofFile, paymentProofFilename)
  //   }

  //   // Create the new record in the 'orders' collection.
  //   const newOrder = await pb.collection('orders').create(pbFormData)

  //   return {
  //     success: true,
  //     orderId: newOrder.id,
  //   }
  // }
  // catch (error) {
  //   console.error('Order creation failed:', error)
  //   const data = (error as any)?.data || { message: 'An internal server error occurred.' }
  //   // If something goes wrong with PocketBase, throw a 500 error.
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: 'Could not create the order.',
  //     // Pass along PocketBase's error data if available.
  //     data,
  //   })
  // }
  return {
    statusCode: 201,
    message: 'TODO: implement create order endpoint',
  }
})

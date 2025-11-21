import { createError, defineEventHandler, setResponseStatus } from 'h3'
import { z } from 'zod'
import { getPbClient } from '~~/server/utils/pb'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  phoneNumber: z.string().min(10, 'A valid phone number is required.'),
  email: z.email('Invalid email address.').optional().or(z.literal('')),
  message: z.string().min(1, 'Message cannot be empty.'),
})

export default defineEventHandler(async (event) => {
  try {
    // eslint-disable-next-line ts/unbound-method
    const validatedBody = await readValidatedBody(event, contactSchema.safeParse)

    if (!validatedBody.success) {
      const errors = validatedBody.error.issues
      throw createError({
        statusCode: 400,
        message: 'Invalid data provided.',
        data: errors,
      })
    }

    const { name, phoneNumber, email, message } = validatedBody.data

    const pb = await getPbClient()

    const data = {
      name,
      phone_number: phoneNumber,
      email,
      message,
    }

    const record = await pb.collection('contact_messages').create(data)

    setResponseStatus(event, 201)
    return {
      message: 'Your message has been sent successfully!',
      data: record,
    }
  }
  catch (error: unknown) {
    // Re-throw H3 errors to let Nitro handle them
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error
    }

    // Log unexpected errors for debugging
    console.error('Error creating contact message:', error)

    // Send a generic 500 error for all other cases
    throw createError({
      statusCode: 500,
      message: 'An unexpected error occurred while sending your message.',
    })
  }
})

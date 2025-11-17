<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const cartStore = useCartStore()
const toast = useToast()

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0)
    return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}
const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const MIN_DIMENSIONS = { width: 200, height: 200 }
const MAX_DIMENSIONS = { width: 4096, height: 4096 }
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

// Checkout Form Logic
const locations = ['Birtamode', 'Damak', 'Chandragadhi', 'Other']
const paymentMethods = [
  { label: 'Pay later', value: 'pay-later' },
  { label: 'Upload Payment Proof', value: 'payment-proof' },
]
const deliveryCosts = {
  Birtamode: 100,
  Damak: 150,
  Chandragadhi: 120,
  Other: 0,
} as const

const isSuccessModalOpen = ref(false)

const schema = z.object({
  name: z.string('Please enter your name').min(1, 'Name must be at least 3 characters long'),
  phoneNumber: z.string('Please enter your phone number').min(10, 'Please enter a valid phone number'),
  location: z.enum(locations as [string, ...string[]]),
  customLocation: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  paymentMethod: z.enum(paymentMethods.map(p => p.value) as [string, ...string[]]),
  paymentProof: z.instanceof(File, {
    message: 'Please upload your payment screenshot',
  }).optional().refine(file => !file ? true : (file.size <= MAX_FILE_SIZE), {
    message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
  }).refine(file => !file ? true : ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: 'Please upload a valid image file (JPEG, PNG, or WebP).',
  }).refine(
    file => !file
      ? true
      : new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
              const meetsDimensions
                = img.width >= MIN_DIMENSIONS.width
                  && img.height >= MIN_DIMENSIONS.height
                  && img.width <= MAX_DIMENSIONS.width
                  && img.height <= MAX_DIMENSIONS.height
              resolve(meetsDimensions)
            }
            img.src = e.target?.result as string
          }
          reader.readAsDataURL(file)
        }),
    {
      message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`,
    },
  ),
})
  .refine((data) => {
  // If payment method is 'payment-proof', then paymentProof file must be provided.
    if (data.paymentMethod === 'payment-proof' && !data.paymentProof) {
      return false
    }
    return true
  }, {
    message: 'Payment proof is required for this payment method.',
    path: ['paymentProof'], // Path of error
  })
  .refine((data) => {
    if (data.location === 'Other') {
      return data.customLocation && data.customLocation.length > 0
    }
    return true
  }, {
    message: 'Please enter your specific location.',
    path: ['customLocation'],
  })

type Schema = z.infer<typeof schema>

const state = ref({
  name: undefined,
  phoneNumber: undefined,
  location: locations[0],
  customLocation: undefined,
  email: undefined,
  paymentMethod: paymentMethods[1]?.value,
  paymentProof: undefined as File | undefined,
})

const deliveryCost = computed(() => {
  return deliveryCosts[state.value.location as keyof typeof deliveryCosts] || 0
})

const totalPriceWithDelivery = computed(() => {
  return cartStore.totalPrice + deliveryCost.value
})

function resetForm() {
  state.value = {
    name: undefined,
    phoneNumber: undefined,
    location: locations[0],
    customLocation: undefined,
    email: undefined,
    paymentMethod: paymentMethods[1]?.value,
    paymentProof: undefined as File | undefined,
  }
}

function handleFormError() {
  toast.add({ title: 'Error', description: 'Please fill out all required fields correctly.', icon: 'i-heroicons-exclamation-circle', color: 'error' })
}

const isSubmitting = ref(false)

async function submitOrder(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true

  const formData = new FormData()
  const paymentProofFile = event.data.paymentProof

  // Create the order data payload, excluding the file
  const orderPayload = {
    ...event.data,
    paymentProof: undefined, // Remove file from JSON payload
    cartItems: cartStore.cartItems,
    totalPrice: cartStore.totalPrice,
    deliveryCost: deliveryCost.value,
    totalPriceWithDelivery: totalPriceWithDelivery.value,
  }

  // Append the JSON data as a string
  formData.append('order', JSON.stringify(orderPayload))

  // Append the file if it exists
  if (paymentProofFile) {
    formData.append('paymentProof', paymentProofFile, paymentProofFile.name)
  }

  try {
    await $fetch('/api/orders/create', {
      method: 'POST',
      body: formData, // Send the FormData object,
    })
    cartStore.clearCart()
    resetForm()
    isSuccessModalOpen.value = true
  }
  catch (error) {
    const message = (error as any)?.data?.message || 'An unexpected error occurred.'
    toast.add({ title: 'Order Submission Failed', description: message, icon: 'i-heroicons-x-circle', color: 'error' })
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="min-h-[60vh]">
    <UContainer class="py-12 bg-neutral-100">
      <h1 class="text-4xl font-bold text-neutral-900 mb-8">
        Your Shopping Cart
      </h1>

      <div
        v-if="cartStore.itemCount === 0"
        class="text-center"
      >
        <UCard>
          <div class="flex flex-col items-center gap-4 p-8">
            <UIcon
              name="i-heroicons-shopping-cart"
              class="text-6xl text-gray-300"
            />
            <p class="text-xl text-gray-600">
              Your cart is empty.
            </p>
            <UButton
              to="/#plants"
              label="Continue Shopping"
              size="lg"
              icon="i-heroicons-arrow-left"
            />
          </div>
        </UCard>
      </div>

      <div
        v-else
        class="grid lg:grid-cols-3 gap-8 items-start"
      >
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <UCard
            v-for="item in cartStore.cartItems"
            :key="item.id"
          >
            <div class="flex flex-wrap gap-4 items-center justify-between">
              <div class="flex gap-4 items-center">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-24 h-24 object-cover rounded-md"
                >
                <div class="flex-1">
                  <h3 class="text-xl font-semibold text-neutral-800">
                    {{ item.name }}
                  </h3>
                  <p class="text-lg text-primary-700 font-bold">
                    रू {{ item.price }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <UButton
                  icon="i-heroicons-minus"
                  size="sm"
                  color="neutral"
                  variant="outline"
                  :disabled="item.quantity <= 1"
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                />
                <span class="font-bold text-2xl w-8 text-center">{{ item.quantity }}</span>
                <UButton
                  icon="i-heroicons-plus"
                  size="sm"
                  color="neutral"
                  variant="outline"
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                />

                <UButton
                  icon="i-heroicons-trash"
                  color="error"
                  variant="ghost"
                  @click="cartStore.removeFromCart(item.id)"
                />
              </div>
            </div>
          </UCard>
        </div>

        <!-- Order Summary and Checkout -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 space-y-6">
            <UCard>
              <h2 class="text-2xl font-semibold mb-4 border-b pb-2">
                Order Summary
              </h2>
              <div class="space-y-2">
                <div class="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span class="font-semibold">रू {{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-lg text-gray-500">
                  <span>Delivery Cost</span>
                  <span
                    v-if="state.location !== 'Other'"
                    class="font-semibold"
                  >रू {{ deliveryCost.toFixed(2) }}</span>
                  <span
                    v-else
                    class="font-semibold"
                  >TBD</span>
                </div>
                <div class="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>रू {{ totalPriceWithDelivery.toFixed(2) }}</span>
                </div>
              </div>
            </UCard>

            <UCard>
              <h2 class="text-2xl font-semibold mb-4">
                Checkout
              </h2>
              <UForm
                :schema="schema"
                :state="state"
                class="space-y-4"
                @submit="submitOrder"
                @error="handleFormError"
              >
                <UFormField
                  label="Full Name"
                  name="name"
                  required
                >
                  <UInput v-model="state.name" class="w-full" />
                </UFormField>
                <UFormField
                  label="Phone Number"
                  name="phoneNumber"
                  required
                >
                  <UInput v-model="state.phoneNumber" class="w-full" />
                </UFormField>
                <UFormField
                  label="Location"
                  name="location"
                  required
                >
                  <USelectMenu
                    v-model="state.location"
                    class="w-full"
                    :items="locations"
                  />
                </UFormField>

                <div
                  v-if="state.location === 'Other'"
                  class="space-y-3"
                >
                  <UAlert
                    icon="i-heroicons-information-circle"
                    color="primary"
                    variant="subtle"
                    title="Special Delivery Note"
                    description="We only deliver to other locations for special cases. We will call you to confirm the order and calculate the full delivery price."
                  />
                  <UFormField
                    label="Your Location"
                    name="customLocation"
                    required
                  >
                    <UInput
                      v-model="state.customLocation"
                      class="w-full"
                      placeholder="Enter your city/area"
                    />
                  </UFormField>
                </div>

                <UFormField
                  label="Email (Optional)"
                  name="email"
                >
                  <UInput
                    v-model="state.email"
                    class="w-full"
                    placeholder="you@example.com"
                  />
                </UFormField>

                <UFormField
                  label="Payment Method"
                  name="paymentMethod"
                  required
                >
                  <URadioGroup
                    v-model="state.paymentMethod"
                    :items="paymentMethods"
                  />
                </UFormField>

                <div
                  v-if="state.paymentMethod === 'payment-proof'"
                  class="p-4 border rounded-md bg-gray-50 space-y-3"
                >
                  <p class="text-sm text-gray-600">
                    Please scan the QR code to pay and upload a screenshot of your payment.
                  </p>
                  <img
                    src="/images/qr.jpg"
                    alt="Payment QR Code"
                    class="mx-auto rounded-lg"
                  >
                  <UFormField
                    label="Upload Payment Proof"
                    name="paymentProof"
                    required
                  >
                    <UFileUpload
                      v-model="state.paymentProof"
                      size="xl"
                      accept="image/*"
                    />
                  </UFormField>
                </div>

                <div class="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>रू {{ totalPriceWithDelivery.toFixed(2) }}</span>
                </div>

                <UButton
                  type="submit"
                  block
                  size="lg"
                  class="justify-center"
                  :loading="isSubmitting"
                >
                  Place Order
                </UButton>
              </UForm>
            </UCard>
          </div>
        </div>
      </div>

      <UModal v-model="isSuccessModalOpen">
        <template #content>
          <UCard>
            <div class="p-4 text-center">
              <UIcon
                name="i-heroicons-check-circle"
                class="text-6xl text-green-500 mx-auto"
              />
              <h2 class="text-2xl font-semibold mt-4">
                Order Placed Successfully!
              </h2>
              <p class="text-gray-600 mt-2">
                We will call you soon to confirm the order.
              </p>
              <div class="mt-6 flex justify-center gap-4">
                <UButton
                  label="Continue Shopping"
                  to="/#plants"
                  @click="isSuccessModalOpen = false"
                />
                <UButton
                  variant="outline"
                  label="Close"
                  @click="isSuccessModalOpen = false"
                />
              </div>
            </div>
          </UCard>
        </template>
      </UModal>
    </UContainer>
  </main>
</template>

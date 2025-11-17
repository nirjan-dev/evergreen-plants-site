<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const cartStore = useCartStore()
const toast = useToast()

// Checkout Form Logic
const locations = ['Inside Ring Road', 'Outside Ring Road'] as const
const paymentMethods = [
  { label: 'Upload Payment Proof', value: 'payment-proof' },
  { label: 'Pay on Delivery', value: 'pay-later' },
]
const contactMethods = ['WhatsApp', 'Phone Call', 'TikTok', 'Instagram'] as const

// eslint-disable-next-line unused-imports/no-unused-vars
const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  location: z.enum(['Inside Ring Road', 'Outside Ring Road']),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  paymentMethod: z.enum(['payment-proof', 'pay-later']),
  preferredContactMethod: z.enum(['WhatsApp', 'Phone Call', 'TikTok', 'Instagram']),
  paymentProof: z.custom<File>(f => f instanceof File, 'Please upload your payment screenshot').optional(),
}).refine((data) => {
  // If payment method is 'payment-proof', then paymentProof file must be provided.
  if (data.paymentMethod === 'payment-proof' && !data.paymentProof) {
    return false
  }
  return true
}, {
  message: 'Payment proof is required for this payment method.',
  path: ['paymentProof'], // Path of error
})

type Schema = z.infer<typeof schema>

const state = ref({
  name: undefined,
  phoneNumber: undefined,
  location: locations[0],
  email: undefined,
  paymentMethod: paymentMethods[1]?.value,
  preferredContactMethod: contactMethods[0],
  paymentProof: undefined as File | undefined,
})

const isSubmitting = ref(false)

// eslint-disable-next-line unused-imports/no-unused-vars
function handlePaymentProofChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files?.length) {
    state.value.paymentProof = target.files[0]
  }
  else {
    state.value.paymentProof = undefined
  }
}

// eslint-disable-next-line unused-imports/no-unused-vars
async function submitOrder(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true
  const formData = new FormData()

  // Append all form fields to FormData
  Object.entries(event.data).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value)
    }
  })

  // Append cart data
  formData.append('cartItems', JSON.stringify(cartStore.cartItems))
  formData.append('totalPrice', cartStore.totalPrice.toString())

  try {
    await $fetch('/api/orders/create', {
      method: 'POST',
      body: formData,
    })

    toast.add({ title: 'Order Placed Successfully!', description: 'We will contact you shortly.', icon: 'i-heroicons-check-circle', color: 'success' })
    cartStore.clearCart()
    // Optionally redirect to a success page
    // await navigateTo('/order-success');
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
    <UContainer class="py-12">
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
              to="/"
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
              <div class="flex items-center gap-3">
                <UButton
                  icon="i-heroicons-minus"
                  size="sm"
                  color="neutral"
                  variant="outline"
                  :disabled="item.quantity <= 1"
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                />
                <span class="font-bold text-lg w-8 text-center">{{ item.quantity }}</span>
                <UButton
                  icon="i-heroicons-plus"
                  size="sm"
                  color="neutral"
                  variant="outline"
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                />
              </div>
              <UButton
                icon="i-heroicons-trash"
                color="error"
                variant="ghost"
                @click="cartStore.removeFromCart(item.id)"
              />
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
                  <span class="font-semibold">TBD</span>
                </div>
                <div class="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>रू {{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>
              </div>
            </UCard>

            <UCard>
              <h2 class="text-2xl font-semibold mb-4">
                Checkout
              </h2>
              <!-- <UForm
                :schema="schema"
                :state="state"
                class="space-y-4"
                @submit="submitOrder"
              >
                <UFormGroup
                  label="Full Name"
                  name="name"
                  required
                >
                  <UInput v-model="state.name" />
                </UFormGroup>
                <UFormGroup
                  label="Phone Number"
                  name="phoneNumber"
                  required
                >
                  <UInput v-model="state.phoneNumber" />
                </UFormGroup>
                <UFormGroup
                  label="Location"
                  name="location"
                  required
                >
                  <USelectMenu
                    v-model="state.location"
                    :options="locations"
                  />
                </UFormGroup>
                <UFormGroup
                  label="Email (Optional)"
                  name="email"
                >
                  <UInput
                    v-model="state.email"
                    placeholder="you@example.com"
                  />
                </UFormGroup>
                <UFormGroup
                  label="Preferred Contact Method"
                  name="preferredContactMethod"
                  required
                >
                  <USelectMenu
                    v-model="state.preferredContactMethod"
                    :options="contactMethods"
                  />
                </UFormGroup>
                <UFormGroup
                  label="Payment Method"
                  name="paymentMethod"
                  required
                >
                  <URadioGroup
                    v-model="state.paymentMethod"
                    :options="paymentMethods"
                  />
                </UFormGroup>

                <div
                  v-if="state.paymentMethod === 'payment-proof'"
                  class="p-4 border rounded-md bg-gray-50 space-y-3"
                >
                  <p class="text-sm text-gray-600">
                    Please scan the QR code to pay and upload a screenshot of your payment.
                  </p>
                  <img
                    src="/images/hero.jpg"
                    alt="Payment QR Code"
                    class="mx-auto rounded-lg"
                  >
                  <UFormGroup
                    label="Upload Payment Proof"
                    name="paymentProof"
                    required
                  >
                    <UInput
                      type="file"
                      accept="image/*"
                      @change="handlePaymentProofChange"
                    />
                  </UFormGroup>
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
              </UForm> -->
            </UCard>
          </div>
        </div>
      </div>
    </UContainer>
  </main>
</template>

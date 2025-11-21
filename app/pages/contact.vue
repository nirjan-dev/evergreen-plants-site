<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const schema = z.object({
  name: z.string('Name is required').min(1, 'Name is required'),
  phoneNumber: z.string('Phone number is required').min(10, 'A valid phone number is required'),
  email: z.email('Invalid email address').optional().or(z.literal('')),
  message: z.string('Message is required').min(1, 'Message is required'),
})

type Schema = z.output<typeof schema>

const formState = ref({
  name: undefined,
  phoneNumber: undefined,
  email: undefined,
  message: undefined,
})

const form = ref()
const formSubmitted = ref(false)
const loading = ref(false)
const toast = useToast()

async function submit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  formSubmitted.value = false
  try {
    await $fetch('/api/messages/contact', {
      method: 'POST',
      body: event.data,
    })
    formSubmitted.value = true
    formState.value = { // Reset form
      name: undefined,
      phoneNumber: undefined,
      email: undefined,
      message: undefined,
    }
    form.value.clear() // Clear form errors
  }
  catch (error: any) {
    const errorMessage = error.data?.message || 'There was an error sending your message. Please try again.'
    toast.add({ title: 'Error', description: errorMessage, color: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <section id="contact" class="bg-neutral-200 py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-neutral-900 mb-4">
            Get in Touch
          </h2>
          <p class="text-xl text-neutral-600">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-neutral-50 rounded-xl p-8">
            <h3 class="text-2xl font-bold text-neutral-900 mb-6">
              Send us a Message
            </h3>
            <UAlert
              v-if="formSubmitted"
              icon="i-heroicons-check-circle"
              color="primary"
              variant="solid"
              title="Message Sent!"
              description="Thank you for contacting us. We will get back to you shortly."
              class="mb-6"
            />
            <UForm ref="form" :schema="schema" :state="formState" class="space-y-4" @submit="submit">
              <UFormField label="Your Name" name="name" required>
                <UInput v-model="formState.name" size="xl" class="w-full" placeholder="Enter your name" />
              </UFormField>
              <UFormField label="Phone Number" name="phoneNumber" required>
                <UInput v-model="formState.phoneNumber" type="tel" size="xl" class="w-full" placeholder="98XXXXXXXX" />
              </UFormField>
              <UFormField label="Email (Optional)" name="email">
                <UInput v-model="formState.email" type="email" size="xl" class="w-full" placeholder="your@email.com" />
              </UFormField>
              <UFormField label="Message" name="message" required>
                <UTextarea v-model="formState.message" :rows="5" size="xl" class="w-full" placeholder="How can we help you?" />
              </UFormField>
              <UButton type="submit" block size="xl" :loading="loading" class="justify-center">
                Send Message
              </UButton>
            </UForm>
          </div>

          <!-- Contact Information -->
          <div>
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-neutral-900 mb-6">
                Visit Our Nursery
              </h3>
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-neutral-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-neutral-900 mb-2">
                      Location
                    </h4>
                    <p class="text-lg text-neutral-600">
                      Chandragadhi, Jhapa<br>Province 1, Nepal
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-neutral-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-neutral-900 mb-2">
                      Phone
                    </h4>
                    <p class="text-lg text-neutral-600">
                      +977 98XXXXXXXX
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-neutral-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-neutral-900 mb-2">
                      Hours
                    </h4>
                    <p class="text-lg text-neutral-600">
                      Sunday - Friday: 8:00 AM - 6:00 PM<br>Saturday: 9:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-neutral-50 rounded-xl p-8">
              <h3 class="text-2xl font-bold text-neutral-900 mb-4">
                Follow Us on TikTok
              </h3>
              <p class="text-lg text-neutral-600 mb-6">
                Check out our plant care tips, new arrivals, and behind-the-scenes content!
              </p>
              <UButton size="xl" to="#">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
                </svg>
                @evergreenplants
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

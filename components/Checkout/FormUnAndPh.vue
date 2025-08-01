<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const { formInfoUser } = storeToRefs(userStore)

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phone: z
    .string()
    .regex(/^0\d{8,9}$/, 'Invalid phone number (must start with 0 and have 9-10 digits)')
})

type Schema = z.output<typeof schema>

// Initialize form state from store
const state = reactive<Partial<Schema>>({
  username: userStore.value?.username || formInfoUser.value.name,
  phone: formInfoUser.value.phone
})

// Keep store and local form state in sync
watch(() => state.username, (val) => {
  userStore.updateName(val ?? '')
  console.log('Updated username:', val)
})
watch(() => state.phone, (val) => {
  userStore.updatePhone(val ?? '')
  console.log('Updated phone:', val)
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  // formInfoUser is already updated via watch
  console.log(event.data)
}
</script>
<template>
  <UForm :schema="schema" :state="state" class="space-y-4 flex justify-between gap-6 " @submit="onSubmit">
    <UFormField label="Username" name="username" class="w-1/2">
      <UInput v-model="state.username" class="w-full" placeholder="Username" color="neutral"/>
    </UFormField>
    <UFormField label="Phone Number" name="phone" class="w-1/2">
      <UInput v-model="state.phone" class="w-full" placeholder="Phone Number" color="neutral" />
    </UFormField>
  </UForm>
</template>

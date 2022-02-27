<template>
  <div>
    <h4 class="text-gray-700">Linked Users</h4>
    <div v-show="registrations.length === 0">no users</div>
    <div v-show="registrations.length !== 0">
      <div class="flex flex-wrap -mx-6">
        <div
          class="w-full px-6 sm:w-1/2 xl:w-1/3"
          v-for="(registration, index) in registrations"
          :key="index"
        >
          <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div>
              <img class="w-full h-full rounded-full" :src="registration.avatarUrl" />
            </div>
            <div class="">
              <router-link
                :to="{
                  name: 'RegistrationDetail',
                  query: { uuid: registration.guestUuid }
                }"
              >
                <h6 class="text-lg font-semibold text-gray-700">{{ registration.guestUuid }}</h6>
              </router-link>
              <div class="text-gray-500">
                {{ registration.name }}
              </div>
              <div class="text-gray-500">
                {{ moment(registration.created).format('ddd MMM DD, YYYY [at] HH:mm a') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import moment from 'moment'
const props = defineProps({
  registrations: {
    type: Object,
    default: null
  }
})
</script>

<style scoped></style>

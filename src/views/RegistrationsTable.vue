<template>
  <div v-if="!isLoading" class="mt-8">
    <div class="mt-6">
      <h2 class="text-xl font-semibold leading-tight text-gray-700">Users</h2>

      <div class="flex flex-col mt-3 sm:flex-row">
        <div class="relative block mt-2 sm:mt-0">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
              />
            </svg>
          </span>

          <input
            placeholder="Search"
            class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  User
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Uuid
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Mobile
                </th>
                <th
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  Registered at
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(u, index) in registrations.content" :key="index">
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-full h-full rounded-full"
                        :src="u.avatarUrl"
                        alt="profile pic"
                      />
                    </div>

                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-nowrap">
                        {{ u.name }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <router-link
                    :to="{
                      name: 'RegistrationDetail',
                      query: { uuid: u.guestUuid }
                    }"
                  >
                    <p class="text-gray-900 whitespace-nowrap">{{ u.guestUuid }}</p>
                  </router-link>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-nowrap">
                    {{ u.mobile }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-nowrap">
                    {{ moment(u.created).format('ddd MMM DD, YYYY [at] HH:mm a') }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
          >
            <span class="text-xs text-gray-900 xs:text-sm"
              >Showing {{ registrations.pageable.offset + 1 }} to
              {{ registrations.pageable.offset + registrations.numberOfElements }} of
              {{ registrations.totalElements }} Entries</span
            >

            <div class="inline-flex mt-2 xs:mt-0">
              <button
                class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
                @click="prev"
                v-bind:disabled="registrations.first"
              >
                Prev
              </button>
              <button
                class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
                @click="next"
                v-bind:disabled="registrations.last"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Skeletor v-else-if="isLoading" height="300" />
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import moment from 'moment'
import { getRegistrationsByPage } from '@/services/GuestService'
import { Skeletor } from 'vue-skeletor'
let page = 0
const size = 10
const isLoading = ref(true)
const registrations = ref({
  content: [
    {
      name: '',
      avatarUrl:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      guestUuid: '',
      mobile: null,
      created: ''
    }
  ],
  pageable: {
    offset: 0
  },
  totalElements: 1,
  last: true,
  numberOfElements: 1,
  first: true
})
watchEffect(() => {
  getRegistrationsByPage(0, 10)
    .then((res) => {
      registrations.value = res
      isLoading.value = false
    })
    .catch((error) => {
      console.log(error)
    })
})
const updateRegistrations: any = (page: number, size: number) => {
  console.log('Dashboard... emit update registrations')
  getRegistrationsByPage(page, size)
    .then((res) => {
      registrations.value = res
      isLoading.value = false
    })
    .catch((error) => {
      console.log(error)
    })
}
const next = () => {
  isLoading.value = true
  updateRegistrations(++page, size)
}
const prev = () => {
  isLoading.value = true
  updateRegistrations(--page, size)
}
</script>

<style scoped></style>

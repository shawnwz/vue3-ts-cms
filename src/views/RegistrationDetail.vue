<template>
  <div>
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
            <tr>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img
                      class="w-full h-full rounded-full"
                      :src="registration.guest.avatarUrl"
                      alt="profile pic"
                    />
                  </div>

                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ registration.guest.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-nowrap">{{ registration.guest.guestUuid }}</p>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-nowrap">
                  {{ registration.guest.mobile }}
                </p>
              </td>
              <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-nowrap" v-if="registration.guest.created">
                  {{ moment(registration.guest.created).format('ddd MMM DD, YYYY [at] HH:mm a') }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <RegistrationBindedAlbums
      :albums="registration.albums"
      v-show="registration.albums.length !== 0"
    ></RegistrationBindedAlbums>
    <div v-show="registration.albums.length === 0">no albums</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watchEffect } from 'vue'
import { getBindedAlbumsByGuestUuid } from '@/services/MediaService'
import { useRoute } from 'vue-router'
import moment from 'moment'
import RegistrationBindedAlbums from '@/views/RegistrationBindedAlbums.vue'
const route = useRoute()
watchEffect(() => {
  getBindedAlbumsByGuestUuid(route.query.uuid)
    .then((res) => {
      registration.value = res
    })
    .catch((error) => {
      console.log(error)
    })
})
onMounted(() => {
  console.log('reg details')
})
const registration = ref({
  guest: {
    name: '',
    guestUuid: '',
    mobile: null,
    gender: '0',
    avatarUrl:
      'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
  },
  albums: [
    {
      album: {
        code: '',
        medias: [
          {
            thumbUrl: ''
          }
        ]
      }
    }
  ]
})
</script>

<style scoped></style>

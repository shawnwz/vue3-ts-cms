<template>
  <div v-if="!isLoading">
    <div class="mt-5">
      <h4 class="text-gray-700">Albums</h4>
      <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl">
        <div
          class="w-full max-w-sm mt-6 lg:max-w-full lg:flex"
          v-for="(album, index) in albumList.content"
          :key="index"
        >
          <div
            class="flex-none h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l"
            title="Woman holding a mug"
          >
            <img
              :src="album.medias[0].thumbUrl"
              :alt="album.medias[0].fileName"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <div
            class="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-200 rounded-b lg:border-l-0 lg:border-t lg:border-gray-200 lg:rounded-b-none lg:rounded-r"
          >
            <div class="mb-8">
              <router-link
                :to="{ name: 'Album', query: { albumId: album.code, siteCode: siteCode } }"
              >
                <div class="mb-2 text-xl font-bold text-gray-900">{{ album.code }}</div>
              </router-link>
              <p class="text-base text-gray-700">{{ album.medias.length }} Photos</p>
              <p class="text-base text-gray-700">
                Taken at: {{ moment(album.created).format('ddd MMM DD, YYYY [at] HH:mm a') }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
      >
        <span class="text-xs text-gray-900 xs:text-sm"
          >Showing {{ albumList.pageable.offset + 1 }} to
          {{ albumList.pageable.offset + albumList.numberOfElements }} of
          {{ albumList.totalElements }} Entries</span
        >

        <div class="inline-flex mt-2 xs:mt-0">
          <button
            v-bind:disabled="albumList.first"
            @click="prev"
            class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
          >
            Prev
          </button>
          <button
            v-bind:disabled="albumList.last"
            @click="next"
            class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  <Skeletor v-else-if="isLoading" height="50" />
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { getAlbumListBySiteCodeByPage } from '@/services/MediaService'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { Skeletor } from 'vue-skeletor'
const route = useRoute()
const router = useRouter()

console.log('router query is ', router.currentRoute.value.query)
const siteCode = router.currentRoute.value.query.siteCode
const isLoading = ref(true)
watchEffect(() => {
  console.log('route path is ', route.path)
  if (route.path === '/albumlist') {
    getAlbumListBySiteCodeByPage(
      route.query.siteCode.toString(),
      route.query.page,
      route.query.size
    )
      .then((res) => {
        albumList.value = res
        isLoading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }
})
const next = () => {
  console.log('next...')
  router
    .push({
      path: '/albumlist',
      query: {
        siteCode: route.query.siteCode.toString(),
        page: Number(route.query.page) + 1,
        size: route.query.size
      }
    })
    .then(() => {
      console.log('Updated route')
    })
}
const prev = () => {
  console.log('prev...')
  router
    .push({
      path: '/albumlist',
      query: {
        siteCode: route.query.siteCode.toString(),
        page: Number(route.query.page) - 1,
        size: route.query.size
      }
    })
    .then(() => {
      console.log('Updated route')
    })
}
const albumList = ref({
  content: [
    {
      code: '',
      medias: [
        {
          fileName: '',
          site: '',
          originalUrl: '',
          thumbUrl: '',
          webUrl: '',
          captureTime: '',
          created: '',
          lastModified: '',
          purchased: false
        }
      ],
      created: '',
      lastModified: ''
    }
  ],
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 0,
    paged: true,
    unpaged: false
  },
  totalPages: 0,
  totalElements: 0,
  last: false,
  number: 1,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false
  },
  size: 0,
  numberOfElements: 0,
  first: false,
  empty: false
})
</script>
<style scoped></style>

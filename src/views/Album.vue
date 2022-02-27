<template>
  <div v-if="!isLoading">
    <AlbumBindedRegistrations :registrations="album.guests"></AlbumBindedRegistrations>
    <h4 class="text-gray-700">Medias</h4>
    <div>
      <div class="mb-8 flex flex-row">
        <button
          type="button"
          class="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded inline-flex items-center"
          @click="setAlbumSellStatus((status = 'sold'))"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-currency-dollar"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"
            />
          </svg>
          Sold All
        </button>
        <!--        <button-->
        <!--          type="button"-->
        <!--          class="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded"-->
        <!--          @click="setAlbumSellStatus((status = 'unsold'))"-->
        <!--        >-->
        <!--          Unsold All-->
        <!--        </button>-->
        <button
          type="button"
          class="ml-auto bg-green-500 hover:bg-green-700 text-white rounded inline-flex items-center py-2 px-4"
          @click="downloadAll(album.album.medias)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cloud-download"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
            />
            <path
              d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
            />
          </svg>
          Download all
        </button>
      </div>
      <div class="vld-parent">
        <loading
          :active="isDownloading"
          :can-cancel="true"
          :on-cancel="onCancel"
          :is-full-page="fullPage"
        ></loading>

        <!--        <label><input type="checkbox" v-model="fullPage" />Full page?</label>-->
        <!--        <button @click="downloadAll(album.album.medias)">fetch Data</button>-->
      </div>
      <div
        class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-5 2xl:gap-x-8"
      >
        <a v-for="(m, index) in album.album.medias" :key="index" :href="m.code" class="group">
          <Media
            :media="m"
            :siteCode="siteCode"
            :albumId="albumId"
            @updateMedia="updateMedia"
          ></Media>
        </a>
      </div>
    </div>
  </div>
  <Skeletor v-else-if="isLoading" height="50" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watchEffect, reactive, nextTick } from 'vue'
import { getAlbumWithGuestsByCode, setAlbumStatus } from '@/services/MediaService'
import { useToast } from 'vue-toastification'
import router from '@/router'
import { store } from '@/store'
import { getters } from '@/store/getters'
import Media from '@/views/Media.vue'
import AlbumBindedRegistrations from '@/views/AlbumBindedRegistrations.vue'
import saveAs from 'file-saver'
import axios from 'axios'
import { http } from '@/services/HttpUtil'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { downloadImagesAsZip } from '@/utils/download'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { Skeletor } from 'vue-skeletor'

console.log('router query is ', router.currentRoute.value.query)
const siteCode = router.currentRoute.value.query.siteCode
const albumId = router.currentRoute.value.query.albumId
console.log('site code is ', siteCode)
console.log('guest is ', albumId)
const toast = useToast()
const route = useRoute()
console.log(route.query.albumId)

const isDownloading = ref(false)
const isLoading = ref(true)
const updateMedia = () => {
  getAlbumWithGuestsByCode(route.query.albumId.toString())
    .then((res) => {
      album.value = res
    })
    .catch((error) => {
      console.log(error)
    })
}

watchEffect(() => {
  console.log('route path is ', route.path)
  if (route.path === '/album') {
    getAlbumWithGuestsByCode(route.query.albumId.toString())
      .then((res) => {
        album.value = res
        isLoading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }
})
const setAlbumSellStatus = (status: string) => {
  setAlbumStatus(
    'JudaGuest',
    album.value.album.code,
    status,
    getters.getUserProfile(store.state).username
  )
    .then((res) => {
      if (res.status.statusCode === '2000') {
        album.value.album.medias.forEach((val, index, arr) => {
          status === 'sold' ? (val.purchased = true) : (val.purchased = false)
        })
      } else {
        toast.error('error! code is ', res.status.statusCode)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
const album = ref({
  guests: [],
  album: {
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
        purchased: true
      }
    ],
    created: '',
    lastModified: ''
  }
})

const downloadAll = (medias: Media[]) => {
  isDownloading.value = true
  downloadImagesAsZip(medias)
    .then(() => {
      isDownloading.value = false
    })
    .catch(() => {
      isDownloading.value = false
    })
}
</script>

<style scoped></style>

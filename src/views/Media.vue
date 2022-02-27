<template>
  <div>
    <div
      class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <img
          class="rounded-t-lg w-full"
          :src="media.thumbUrl"
          :alt="media.name"
          @click="openmodal"
        />
      </div>
      <div>
        <div>
          <p
            class="truncate ... hover:text-clip mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ media.fileName }}
          </p>
        </div>
        <div>
          <p
            class="truncate ... hover:text-clip mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ moment(media.captureTime).format('ddd MMM DD, YYYY [at] HH:mm a') }}
          </p>
        </div>
        <span
          v-show="media.purchased"
          class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
          >Currently Sold</span
        >
        <span
          v-show="!media.purchased"
          class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
          >Currently UnSold</span
        >
      </div>
      <div class="flex items-center justify-center mb-3">
        <div class="flex flex-wrap rounded-md shadow-sm" role="group">
          <button
            class="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            @click="setStatus(e, (status = 'sold'))"
            v-if="!media.purchased"
            type="button"
          >
            To Sold
          </button>
          <button
            class="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            @click="setStatus(e, (status = 'unsold'))"
            v-else-if="media.purchased"
            type="button"
          >
            To UnSold
          </button>
          <button
            type="button"
            class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            @click="downloadOne(media)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
              />
              <path
                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
              />
            </svg>
          </button>
          <button
            class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            @click="deleteMedia(media)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div
      :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        @click="open = false"
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      ></div>

      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
        <div
          class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="px-6 py-4 text-left modal-content">
          <!--Title-->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">{{ media.sourceId }}</p>
            <div class="z-50 cursor-pointer modal-close" @click="open = false">
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>

          <!--Body-->
          <p>{{ media.fileName }}</p>
          <div>
            <img :src="media.webUrl" />
          </div>

          <!--Footer-->
          <div class="flex justify-end pt-2">
            <button
              @click="open = false"
              class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
            >
              Close
            </button>
            <!--            <button-->
            <!--              @click="open = false"-->
            <!--              class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"-->
            <!--            >-->
            <!--              Action-->
            <!--            </button>-->
          </div>
        </div>
      </div>
    </div>
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
</template>

<script setup lang="ts">
import { defineProps, defineEmits, defineExpose, ref } from 'vue'
import { setMediaStatus, deleteMediaFromAlbum } from '@/services/MediaService'
import { store } from '@/store'
import { getters } from '@/store/getters'
import { Media } from '@/types/media'
import moment from 'moment'
import { downloadImage } from '@/utils/download'
const props = defineProps({
  media: {
    type: Object as () => Media,
    default: null
  },
  siteCode: {
    type: String,
    default: null
  },
  albumId: {
    type: String,
    default: null
  }
})
const open = ref(false)
const isDownloading = ref(false)
const emit = defineEmits(['updateMedia'])
const updateMedia = () => {
  emit('updateMedia')
}
defineExpose({
  updateMedia
})
const setStatus = (e: any, status: any) => {
  setMediaStatus(props.siteCode, 'JudaGuest', props.albumId, props.media.fileName, status)
    .then((res) => {
      console.log(res)
      updateMedia()
    })
    .catch()
}
const deleteMedia = (media: Media) => {
  if (confirm('are you sure?')) {
    deleteMediaFromAlbum(
      'JudaGuest',
      props.albumId,
      media.id,
      true,
      getters.getUserProfile(store.state).username
    )
      .then((res) => {
        console.log(res)
        updateMedia()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const openmodal = () => {
  console.log('open modal')
  open.value = true
}
const downloadOne = (media: Media) => {
  isDownloading.value = true
  downloadImage(media)
    .then(() => {
      isDownloading.value = false
    })
    .catch(() => {
      isDownloading.value = false
    })
}
</script>

<style scoped></style>

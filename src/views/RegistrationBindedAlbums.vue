<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Binded Albums</h3>

    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full px-6 sm:w-1/2 xl:w-1/3" v-for="(album, index) in albums" :key="index">
          <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div>
              <img :src="album.album.medias[0].thumbUrl" />
            </div>

            <div class="mx-5">
              <router-link
                :to="{
                  name: 'Album',
                  query: { albumId: album.album.code, siteCode: album.album.code.slice(0, 4) }
                }"
              >
                <h4 class="text-2xl font-semibold text-gray-700">{{ album.album.code }}</h4>
              </router-link>
              <div class="text-gray-500">
                {{ moment(album.created).format('ddd MMM DD, YYYY [at] HH:mm a') }}
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
  albums: {
    type: Object,
    default: null
  }
})
</script>

<style scoped></style>

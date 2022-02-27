<template>
  <div v-if="!isLoading">
    <h2 class="text-xl font-semibold leading-tight text-gray-700">Sites</h2>
    <div
      class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 2xl:gap-x-8"
    >
      <div class="mt-4" v-for="(c, index) in siteCount" v-bind:key="index">
        <router-link
          :class="[$route.name === 'AlbumList' ? activeClass : inactiveClass]"
          :to="{ name: 'AlbumList', query: { siteCode: c.siteCode, page: 0, size: 6 } }"
        >
          <div
            class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">{{ c.siteCode }}</h4>
              <div class="text-gray-500">{{ c.total }} Photos</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <Skeletor v-else-if="isLoading" height="50" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { getSiteMediaCount } from '@/services/MediaService'
import 'vue-skeletor/dist/vue-skeletor.css'
import { Skeletor } from 'vue-skeletor'

const siteCount = ref({})
const isLoading = ref(true)
watchEffect(() => {
  getSiteMediaCount()
    .then((res) => {
      siteCount.value = res
      isLoading.value = false
    })
    .catch((error) => {
      console.log(error)
    })
})

console.log('site count value is ', siteCount)
</script>

<style scoped></style>

<template>
  <div class="text-center" v-show="isLoading">
    <p>loading</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { defineExpose } from 'vue'
const isLoading = ref(true)
const setLoading = (loading: boolean) => {
  isLoading.value = loading
}
defineExpose({
  setLoading
})
</script>

<style scoped></style>

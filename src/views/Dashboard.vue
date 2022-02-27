<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>
    <div class="mt-8"></div>
    <SiteStatics></SiteStatics>

    <div class="mt-8"></div>

    <RegistrationsTable></RegistrationsTable>
  </div>
</template>

<script setup lang="ts">
import RegistrationsTable from '@/views/RegistrationsTable.vue'
import SiteStatics from '@/views/SiteStatics.vue'
</script>

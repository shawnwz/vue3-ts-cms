<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header @logout="logout" />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { defineEmits, defineProps } from 'vue'
const emit = defineEmits(['logout'])
const logout = () => {
  console.log('logging out')
  emit('logout')
}

const sites = [
  {
    id: 1,
    code: 'LDSY',
    name: 'Legoland Discovery Center Shenyang',
    icon: ''
  },
  {
    id: 2,
    code: 'SLSY',
    name: 'Sea Life Shenyang',
    icon: ''
  },
  {
    id: 3,
    code: 'MTBE',
    name: 'Madame Tussauds Beijing',
    icon: ''
  },
  {
    id: 4,
    code: 'LDBE',
    name: 'Legoland Discovery Center Beijing',
    icon: ''
  },
  {
    id: 5,
    code: 'LBBE',
    name: 'Little Big City Beijing',
    icon: ''
  },
  {
    id: 6,
    code: 'DUSH',
    name: 'The Shanghai Dungeon',
    icon: ''
  },
  {
    id: 7,
    code: 'MTSH',
    name: 'Madame Tussauds Shanghai',
    icon: ''
  },
  {
    id: 8,
    code: 'SLSH',
    name: 'Changfeng Ocean World',
    icon: ''
  },
  {
    id: 9,
    code: 'LDSH',
    name: 'Legoland Discovery Center Shanghai',
    icon: ''
  },
  {
    id: 10,
    code: 'MTWU',
    name: 'Madame Tussauds Wuhan',
    icon: ''
  },
  {
    id: 11,
    code: 'MTCQ',
    name: 'Madame Tussauds Chongqing',
    icon: ''
  },
  {
    id: 12,
    code: 'PPSH',
    name: 'Peppa Pig World of Play Shanghai',
    icon: ''
  },
  {
    id: 13,
    code: 'MMHK',
    name: 'New Zealand Week',
    icon: ''
  }
  // More Sites...
]
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
    <div class="flex items-center">
      <button @click="isOpen = true" class="text-gray-500 focus:outline-none lg:hidden">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="relative mx-4 lg:mx-0">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        <input
          :value="q"
          @input="input"
          @keyup.enter="search"
          class="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          type="text"
          placeholder="Search Album Code"
        />
      </div>
    </div>

    <div class="flex items-center">
      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
        >
          <img
            class="object-cover w-full h-full"
            src="../assets/mmlogo-round.png"
            alt="Your avatar"
          />
        </button>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 z-10 w-full h-full"
        ></div>

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >Profile</a
            >
            <router-link
              to="/"
              @click="logout"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >Log out</router-link
            >
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, onMounted } from 'vue'
import { useSidebar } from '../hooks/useSidebar'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { useToast } from 'vue-toastification'

const router = useRouter()
const dropdownOpen = ref(false)
const { isOpen } = useSidebar()
const store = useStore()
const toast = useToast()

const props = defineProps({
  q: {
    type: String,
    default: ''
  },
  auth: Object
})

function input(e) {
  //console.log(e.target.value)
}
const emit = defineEmits(['logout'])

//Test code 'TEST6DIMTEJU' 'TOUC6D60C33N'
function search(e: any) {
  console.log('start search...')
  console.log('q is ...' + e.target.value)
  if (!validAlbumCode(e.target.value)) {
    console.log('album code is not valid!')
    toast.info('The album code is not valid!')
  } else {
    router
      .push({
        path: '/album',
        query: {
          albumId: e.target.value,
          siteCode: e.target.value.slice(0, 4)
        }
      })
      .then(() => {
        console.log('Updated route')
      })
  }
}
const logout = () => {
  console.log('logout...')
  emit('logout')
}
function validAlbumCode(albumCode: string): boolean {
  if (/[a-zA-Z]{4}[0-9a-zA-Z]{5}\d{4}/.test(albumCode)) {
    console.log(`Validating album code (valid - is MagicPass ID)`)
    return true
  }
  if (!albumCode) {
    console.log(`Validating album code (invalid - no code)`)
    return false
  }
  if (albumCode.toString().indexOf('/') != -1) {
    console.log('Validating album code (invalid - includes a forward slash)')
    return false
  }
  if (albumCode.length < 12 || albumCode.length > 16) {
    console.log(`Validating album code (invalid - wrong length)`)
    return false
  }
  if (/[0-9]/.test(albumCode.toString().slice(0, 4))) {
    console.log(`Validating album code (invalid - no site code)`)
    return false
  }
  const date = albumCode.toString().slice(5, 9)
  const randomNumber = albumCode.toString().slice(8, 12)
  const dateDecoded = parseInt(date, 32)
  const dateDecodedLength = dateDecoded.toString().length
  const randomNumberDecoded = parseInt(randomNumber, 32)
  if (!isFinite(dateDecoded)) {
    console.log(`Validating album code (invalid - date is not valid when base32 decoded)`)
    return false
  }
  if (dateDecodedLength !== 6) {
    console.log(
      `Validating album code (invalid - date is too short (${dateDecodedLength}) when base32 decoded)`
    )
    return false
  }
  if (!isFinite(randomNumberDecoded)) {
    console.log(`Validating album code (invalid - random number is not valid when base32 decoded)`)
    return false
  }
  console.log(`Validating album code (valid)`)
  return true
}
</script>

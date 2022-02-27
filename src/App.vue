<template>
  <DashboardLayout v-if="authenticated" @logout="logout">
    <router-view></router-view>
  </DashboardLayout>
  <div
    v-show="!authenticated"
    class="flex flex-col justify-center place-items-center h-screen px-6 py-6"
  >
    <button
      class="align-middle px-6 py-1 bg-gray-400 rounded text-white hover:bg-gray-500"
      @click="login"
      v-if="!authenticated"
    >
      Login
    </button>
  </div>
  <!--  <router-view v-if="authenticated" />-->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'
import { useStore } from '@/store'
import { MutationTypes } from '@/store/mutation-types'

@Options({
  components: { DashboardLayout },
  props: {
    auth: Object
  },
  watch: {}
})
export default class App extends Vue {
  msg!: string
  authenticated = false
  auth: any
  layout: any

  created() {
    const { currentRoute } = useRouter()
    const store = useStore()
    this.layout = 'default-layout'
    //this.layout = computed(() => `${currentRoute.value.meta.layout || this.defaultLayout}-layout`)
    const setAuth = this.setAuthenticated
    this.auth.keycloak.onReady = function (status: boolean) {
      console.log('keycloak is ready, authenticated is', status)
      setAuth(status)
    }
  }

  logout() {
    this.auth.logout()
  }

  login() {
    this.auth.login()
  }

  setAuthenticated(status: boolean) {
    this.authenticated = status
  }
}
</script>

import { createApp } from 'vue'
import App from './App.vue'
import globalRegister from '@/global'
import router from '@/router'
import { store, key } from './store'
import { Authentication } from '@/auth/auth'
import './assets/main.css'
import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'
const auth = new Authentication()
auth.init()
const defaultToastOptions: PluginOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 1000,
  transition: 'fade',
  hideProgressBar: true
}

const app = createApp(App, { auth: auth })

//app.use(globalRegister)
app.use(store, key)
app.use(Toast, defaultToastOptions)
app.component('default-layout', DashboardLayout)
app.component('empty-layout', EmptyLayout)
app.use(router)
app.mount('#app')

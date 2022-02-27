import Http from './RequestService'

const http = new Http({
  baseURL: process.env.VUE_APP_BASE_URL
})

export { http }

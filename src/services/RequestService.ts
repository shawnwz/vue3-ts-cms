import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { HttpInstanceConfig, HttpRequestInterceptors } from './types'
import { store } from '@/store'
import { getters } from '@/store/getters'
import NProgress from 'nprogress'
const errorHandler = (error: any) => {
  const status = error?.response?.status
  switch (status) {
    case 400:
      error.message = 'Bad Request'
      break
    case 401:
      error.message = 'Unauthorized'
      break
    case 403:
      error.message = 'Forbidden'
      break
    case 404:
      error.message = `Not Found: ${error?.response?.config?.baseURL}`
      break
    case 408:
      error.message = 'Request Timeout'
      break
    case 500:
      error.message = 'Internal Server Error'
      break
    case 501:
      error.message = 'Not Implemented'
      break
    case 502:
      error.message = 'Bad Gateway'
      break
    case 503:
      error.message = 'Service Unavailable'
      break
    case 504:
      error.message = 'Gateway Timeout'
      break
    case 505:
      error.message = 'HTTP Version Not Supported'
      break
    default:
      error.message = 'Unknown Error'
      break
  }
  return Promise.reject(error)
}

class Http {
  instance: AxiosInstance

  interceptors?: HttpRequestInterceptors
  constructor(config: HttpInstanceConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(function (config: AxiosRequestConfig) {
      if (!config) {
        config = {}
      }
      if (!config.headers) {
        config.headers = {}
      }
      //config.headers['Authorization'] = `Bearer ${store.state.token}`
      config.headers['Authorization'] = `Bearer ${getters.getToken(store.state)}`
      NProgress.start()
      return config
    }, errorHandler)

    this.instance.interceptors.request.use(
      this?.interceptors?.requestInterceptors,
      this?.interceptors?.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(function (res: AxiosResponse) {
      const resData = res.data
      const code = resData?.code
      let message = ''
      if (code === undefined) {
        NProgress.done()
        return resData
      } else {
        switch (code) {
          case 200:
            NProgress.done()
            return resData
          default:
            NProgress.done()
            message = 'unknown code，talk with support!'
        }
      }
      return resData
    }, errorHandler)

    this.instance.interceptors.response.use(
      this?.interceptors?.responseInterceptors,
      this?.interceptors?.responseInterceptorsCatch
    )
  }

  request<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
  put<T>(config: HttpInstanceConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}

export default Http

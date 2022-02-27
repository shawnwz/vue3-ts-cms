import { http } from './HttpUtil'

export const getRegistrationsByPage = (page: number, size: number): Promise<any> => {
  return http.get({
    url: '/guest/admin/registrations',
    params: {
      page: page,
      size: size
    }
  })
}

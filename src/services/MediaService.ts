import { http } from './HttpUtil'

export const getAlbumByCode = (code: string): Promise<any> => {
  return http.get({
    url: '/media/admin/album/code/' + code
  })
}

export const getAlbumWithGuestsByCode = (code: string): Promise<any> => {
  return http.get({
    url: '/media/admin/album/code/' + code + '/guests'
  })
}

export const getSiteMediaCount = (): Promise<any> => {
  return http.get({
    url: '/media/admin/medias/count'
  })
}

export const getAlbumListBySiteCodeByPage = (
  siteCode: string,
  page: number,
  size: number
): Promise<any> => {
  return http.get({
    url: '/media/admin/album/site/' + siteCode,
    params: {
      page: page,
      size: size
    }
  })
}

export const setMediaStatus = (
  siteCode: string,
  application_id: string,
  guest: string,
  media: string,
  status: string
): Promise<any> => {
  return http.put({
    url: '/media/admin/album/media/sell/status',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    },
    data: {
      site_code: siteCode,
      application_id: application_id,
      guest: guest,
      media: media,
      status: status
    },
    params: {
      site_code: siteCode,
      application_id: application_id,
      guest: guest,
      media: media,
      status: status
    }
  })
}

export const setAlbumStatus = (
  application_id: string,
  albumCode: string,
  status: string,
  operator: string
): Promise<any> => {
  return http.put({
    url: '/media/admin/album/sell/status',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      application_id: application_id,
      albumCode: albumCode,
      status: status,
      operator: operator
    }
  })
}

export const getBindedAlbumsByGuestUuid = (uuid: string): Promise<any> => {
  return http.get({
    url: '/media/admin/albums/' + uuid
  })
}

export const getLinkedGuestsByAlbumCode = (code: string): Promise<any> => {
  return http.get({
    url: '/media/admin/guests/' + code
  })
}

export const deleteMediaFromAlbum = (
  application_id: string,
  albumCode: string,
  mediaId: number,
  deleted: boolean,
  operator: string
): Promise<any> => {
  return http.delete({
    url: '/media/admin/album/media',
    data: {
      application_id: application_id,
      albumCode: albumCode,
      mediaId: mediaId,
      deleted: deleted,
      operator: operator
    }
  })
}

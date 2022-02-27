import JSZip from 'jszip'
import axios from 'axios'
import FileSaver from 'file-saver'
import { Media } from '@/types/media'

export const downloadImagesAsZip = (medias: Media[]): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const zip = new JSZip()
    let count = 0
    const cancelToken = axios.CancelToken
    const zipName = new Date().getTime() + '.zip'
    medias.forEach((media) => {
      downloadWithAxios(media.originalUrl)
        .then((res) => {
          count++
          if (res.data) {
            const fileName = media.fileName
            zip.file(fileName + '.jpg', res.data, { binary: true })
            if (medias.length == count) {
              zip.generateAsync({ type: 'blob' }).then(function (content) {
                FileSaver.saveAs(content, zipName)
                resolve(true)
              })
            }
          }
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('cancel by user')
            reject(false)
          } else {
            console.log('axios error', error.message)
            reject(false)
          }
        })
    })
  })
}

export const downloadImage = (media: Media): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    downloadWithAxios(media.originalUrl)
      .then((res) => {
        FileSaver.saveAs(res.data, media.fileName + '.' + media.fileType)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

const downloadWithAxios = (url: string): Promise<any> => {
  return axios({
    method: 'GET',
    url: url,
    responseType: 'blob',
    onDownloadProgress: onDownloadProgress
  })
}

function onDownloadProgress(ev: any) {
  console.log(ev)
  // do your thing here
  console.log(100 * (ev.loaded / ev.total))
}

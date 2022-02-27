import Mock from 'mockjs'

Mock.mock('/getAlbums', {
  code: 200,
  message: `successfully done`,
  data: []
})

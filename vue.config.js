module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://mofa-api.test.magicmemories.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

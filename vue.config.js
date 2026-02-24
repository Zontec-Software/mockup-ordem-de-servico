const { defineConfig } = require('@vue/cli-service')

// Para GitHub Pages (project page): https://<user>.github.io/mockup-ordem-de-servico/
// Defina VUE_APP_PUBLIC_PATH=/ para user/org page (https://<user>.github.io/)
const publicPath = process.env.VUE_APP_PUBLIC_PATH !== undefined
  ? process.env.VUE_APP_PUBLIC_PATH
  : process.env.NODE_ENV === 'production'
    ? '/mockup-ordem-de-servico/'
    : '/'

module.exports = defineConfig({
  publicPath,
  transpileDependencies: true
})

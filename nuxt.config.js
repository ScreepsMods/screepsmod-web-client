const pkg = require('./package')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'spa',
  srcDir: 'src/',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  router: {
    base: '/client/'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    'vuetify/src/stylus/main.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/api'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/proxy',
    '@nuxtjs/axios'
  ],
  proxy: {
    '/api': 'http://server1.screepspl.us:21025',
    '/socket': 'http://server1.screepspl.us:21025',
    '/assets': 'http://server1.screepspl.us:21025',
    '/room-history': 'http://server1.screepspl.us:21025',
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/,/^@screeps/]
          })
        ]
      }
      if (ctx.isClient) {
        config.resolve.alias.ws = path.resolve(__dirname, './src/ws.js')
        config.resolve.symlinks = false
        config.node = config.node || {}
        config.node.fs = 'empty'
      }
    }
  }
}

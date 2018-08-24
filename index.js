const express = require('express')

const { EventEmitter } = require('events')
let ee = new EventEmitter()

module.exports = function (config) {
  if (!config.backend) return
  const { env, db, pubsub } = config.common.storage
  config.backend.on('expressPreConfig', (app) => {
    app.use('/client', express.static(`${__dirname}/dist/`))
  })
}

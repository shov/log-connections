"use strict"

const path = require('path')

global.APP_PATH = path.resolve(__dirname)
require('dotenv').config({
  path: path.join(APP_PATH + '/.env'),
})


//TODO: logger
const logger = new (require('./services/Logger'))()

const connectionsController = new (require('./controllers/ConnectionsController'))(
  logger
)

const router = (require('./config/routes'))(
  connectionsController
)

/** @type {App} */
const app = new (require('./services/App'))(
  logger,
  router
)

app.start()

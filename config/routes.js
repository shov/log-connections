"use strict"

const router = require('express').Router()

/**
 * DI
 * @param {ConnectionsController} connectionsController
 */
function defineRoutes(connectionsController) {
  router.use(function (req, res) {
    connectionsController.handle.call(connectionsController, req, res)
  })

  return router
}

module.exports = defineRoutes

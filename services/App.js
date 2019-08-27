"use strict"

/**
 * Application
 */
class App {
  /**
   * DI
   * @param {Logger} logger
   * @param {Router} router
   */
  constructor(logger, router) {
    /**
     * @type {Logger}
     * @private
     */
    this._logger = logger

    /**
     * @type {Router}
     * @private
     */
    this._router = router

    this._config = {
      port: process.env.PORT || 3000
    }
  }

  /**
   * Start an app
   */
  start() {
    const expressApp = (require('express'))()
    const http = require('http')
    const https = require('https')
    const fs = require('fs')

    expressApp.use(this._router)

    if (process.env.SSL && 'true' === process.env.SSL) {

      const DEFAULT_KEY = '/certs/privatekey.pem'
      const DEFAULT_CERT = '/certs/certificate.pem'

      const privateKey = fs.readFileSync(APP_PATH + (process.env.SSL_KEY || DEFAULT_KEY))
      const certificate = fs.readFileSync(APP_PATH + (process.env.SSL_CERT || DEFAULT_CERT))

      https.createServer({
        key: privateKey,
        cert: certificate
      }, expressApp).listen(this._config.port, () => {
        this._logger.log(`[HTTPS] Start listening on ${this._config.port}`)
      })

      return
    }

    http.createServer(expressApp).listen(this._config.port, () => {
      this._logger.log(`[HTTP] Start listening on ${this._config.port}`)
    })
  }
}

module.exports = App

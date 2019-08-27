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

    expressApp.use(this._router)

    expressApp.listen(this._config.port, () => {
      this._logger.log(`Start listening on ${this._config.port}`)
    })
  }
}

module.exports = App

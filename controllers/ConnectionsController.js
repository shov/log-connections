"use strict"

/**
 * Handle any request to log it
 */
class ConnectionsController {
  /**
   * DI
   * @param  {Logger} logger
   */
  constructor(logger) {
    this._logger = logger
  }

  /**
   * Handle connection (request)
   * @param req
   * @param res
   */
  handle(req, res) {
    const info = {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      host: req.headers.host,
      domain: req.domain,
      method: req.method,
      url: req.url,
      ua: req.headers['user-agent'],
    }

    this._logger.log(info)
    res.send(info)
  }
}

module.exports = ConnectionsController

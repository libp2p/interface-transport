'use strict'

class AbortError extends Error {
  constructor () {
    super('AbortError')
    this.code = AbortError.code
  }

  static get code () {
    return 'ABORT_ERR'
  }
}

class AllListenersFailedError extends Error {
  constructor () {
    super('All listeners failed to listen on any addresses, please verify the addresses you provided are correct')
    this.code = AllListenersFailedError.code
  }

  static get code () {
    return 'ERR_ALL_LISTENERS_FAILED'
  }
}

module.exports = {
  AbortError,
  AllListenersFailedError
}

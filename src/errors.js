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
    super('AllListenersFailedError')
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

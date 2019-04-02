/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

const goodbye = require('it-goodbye')
const { collect } = require('streaming-iterables')
const pipe = require('it-pipe')

module.exports = (common) => {
  describe('dial', () => {
    let addrs
    let transport
    let listener

    before(async () => {
      ({ transport, addrs } = await common.setup())
    })

    after(() => common.teardown && common.teardown())

    beforeEach(() => {
      listener = transport.createListener((conn) => pipe(conn, conn))
      return listener.listen(addrs[0])
    })

    afterEach(() => listener.close())

    it('simple', async () => {
      const conn = await transport.dial(addrs[0])

      const s = goodbye({ source: ['hey'], sink: collect })

      const result = await pipe(s, conn, s)

      expect(result.length).to.equal(1)
      expect(result[0].toString()).to.equal('hey')
    })

    it('to non existent listener', async () => {
      try {
        await transport.dial(addrs[1])
      } catch (_) {
        // Success: expected an error to be throw
        return
      }
      expect.fail('Did not throw error')
    })
  })
}

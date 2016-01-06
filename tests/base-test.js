var multiaddr = require('multiaddr')

module.exports.all = function (test, common, listenerOpts, dialerOpts) {
  test('a test', function (t) {
    common.setup(test, function (err, transport) {
      t.plan(5)
      t.ifError(err)

      var maddr = multiaddr('/ip4/127.0.0.1/tcp/9050')

      var listener = transport.createListener(function (stream) {
        t.pass('received incoming connection')
        stream.end()
        listener.close(function () {
          t.pass('listener closed successfully')
          t.end()
        })
      }, listenerOpts)

      listener.listen(maddr.nodeAddress().port, function () {
        t.pass('started listening')
        dialerOpts.ready = function () {
          t.pass('dialed successfuly')
          stream.end()
        }
        var stream = transport.dial(maddr, dialerOpts)
      })
    })
  })
}

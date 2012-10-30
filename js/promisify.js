var async = require('promised-io/promise');

module.exports = function(nodeAsyncFn, context) {
  return function() {
    var defer = new async.Deferred()
      , args = Array.prototype.slice.call(arguments);

    args.push(function(err, val) {
      if (err !== null) {
        return defer.reject(err);
      }

      return defer.resolve(val);
    });

    nodeAsyncFn.apply(context || {}, args);

    return defer.promise;
  };
};
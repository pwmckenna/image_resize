var async = require('promised-io/promise'); // >=v2.4

module.exports = function(nodeAsyncFn, context) {
  return function() {
    var defer = async.defer()
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
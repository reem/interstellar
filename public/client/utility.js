exports.reverseMap = function (funcList, val) {
  return _.map(funcList, function (func) { return func(val); });
};

exports.invoke = function (func, context, args) {
  return func.apply(context, args);
};

exports.methodMap = function (os, method) {
  return _.map(_.pluck(os, method), exports.invoke);
};

exports.thunk = function (val) {
  return function () {
    return val;
  };
};

exports.not = function (fn, c) {
  return function () { return !fn.apply(c, arguments); };
};
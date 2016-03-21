'use strict';

var mix = require('reduxr-mix');

// Takes a hash of functions and returns a hash of Redux actions.
// Each function on the original hash is expected to return an object.
// This will automatically assign a "type" property to said object.
module.exports = function objActions (dispatch, obj, prefix) {
  !prefix && (prefix = '');

  var result = {};

  for (var key in obj) {
    var val = obj[key];
    var type = prefix + key;

    result[key] = isFunction(val) ?
      autoTypeAndDispatch(dispatch, val, type) :
      objActions(dispatch, val, type + '_');
  }

  return result;
}

function autoTypeAndDispatch(dispatch, fn, type) {
  return function () {
    var result = fn.apply(null, arguments);

    return dispatch(mix({type: type}, result));
  }
}

function isFunction(val) {
  return typeof val === 'function';
}

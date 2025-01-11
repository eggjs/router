'use strict';

const convert = require('koa-convert');
const co = require('co');

function isGeneratorFunction(obj) {
  return obj
    && obj.constructor
    && obj.constructor.name === 'GeneratorFunction';
}

module.exports = {
  async callFn(fn, args, ctx) {
    args = args || [];
    if (typeof fn !== 'function') return;
    if (isGeneratorFunction(fn)) fn = co.wrap(fn);
    return ctx ? fn.call(ctx, ...args) : fn(...args);
  },

  middleware(fn) {
    return isGeneratorFunction(fn) ? convert(fn) : fn;
  },

  isGeneratorFunction,
  isAsyncFunction(obj) {
    return obj
      && obj.constructor
      && obj.constructor.name === 'AsyncFunction';
  },
  isPromise(obj) {
    return obj
      && typeof obj.then === 'function';
  },
};

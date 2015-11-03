'use strict';

var CallbackQueue = require('react/lib/CallbackQueue');
var PooledClass = require('react/lib/PooledClass');
var Transaction = require('react/lib/Transaction');

var assign = require('react/lib/Object.assign');

var ON_TK_READY_QUEUEING = {
  initialize: function () {
    this.reactMountReady.reset();
  },
  close: function () {
    this.reactMountReady.notifyAll();
  }
};

function ReactTkReconcileTransaction() {
  this.reinitializeTransaction();
  this.reactMountReady = CallbackQueue.getPooled(null);
}

var Mixin = {
  getTransactionWrappers: function() {
    return [ON_TK_READY_QUEUEING];
  },
  getReactMountReady: function() {
    return this.reactMountReady;
  },
  destructor: function() {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

assign(
  ReactTkReconcileTransaction.prototype,
  Transaction.Mixin,
  Mixin
);

PooledClass.addPoolingTo(ReactTkReconcileTransaction);

module.exports = ReactTkReconcileTransaction;

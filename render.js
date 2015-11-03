'use strict';

var ReactInstanceHandles = require('react/lib/ReactInstanceHandles');
var ReactUpdates = require('react/lib/ReactUpdates');

var instantiateReactComponent = require('react/lib/instantiateReactComponent');

function render(element) {
  var id = ReactInstanceHandles.createReactRootID();
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
  var component = instantiateReactComponent(element);
  transaction.perform(function() {
    component.mountComponent(id, transaction, {});
  });
}

module.exports = render;

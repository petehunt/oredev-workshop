'use strict';

var ReactInjection = require('react/lib/ReactInjection');
var ReactComponentEnvironment = require('react/lib/ReactComponentEnvironment');
var ReactTkReconcileTransaction = require('./ReactTkReconcileTransaction');
var ReactTkComponent = require('./ReactTkComponent');

var ReactTkInjection = {
  inject: function() {
    ReactInjection.NativeComponent.injectGenericComponentClass(
      ReactTkComponent
    );

    ReactInjection.Updates.injectReconcileTransaction(
      ReactTkReconcileTransaction
    );

    ReactInjection.EmptyComponent.injectEmptyComponent('element');

    // NOTE: we're monkeypatching ReactComponentEnvironment because
    // ReactInjection.Component.injectEnvironment() currently throws,
    // as it's already injected by ReactDOM for backward compat in 0.14 betas.
    // Read more: https://github.com/Yomguithereal/react-blessed/issues/5
    ReactComponentEnvironment.processChildrenUpdates = function () {};
    ReactComponentEnvironment.replaceNodeWithMarkupByID = function () {};
  },
};

module.exports = ReactTkInjection;

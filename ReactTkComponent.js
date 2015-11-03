'use strict';

var ReactMultiChild = require('react/lib/ReactMultiChild');
var ReactTkWindowServer = require('./ReactTkWindowServer');

var assign = require('react/lib/Object.assign');

function ReactTkComponent() {
  this._currentElement = null;
  this._renderedChildren = null;
  this._rootNodeID = null;
}

assign(ReactTkComponent.prototype, ReactMultiChild.Mixin, {
  construct: function(initialElement) {
    this._currentElement = initialElement;
  },

  mountComponent: function(id, transaction, context) {
    this._rootNodeID = id;

    var widgetType = this._currentElement.type;
    // widgetType needs to be capitalized for Tkinter
    if (widgetType !== 'container') {
      widgetType = widgetType[0].toUpperCase() + widgetType.slice(1);

      ReactTkWindowServer.sendCommand({
        type: 'create',
        widgetType: widgetType,
        key: id,
      });
    }

    if (this._currentElement.props.children) {
      this.mountChildren(this._currentElement.props.children, transaction, context);
    }

    this.receiveComponent(this._currentElement, transaction, context);
  },

  receiveComponent: function(nextElement, transaction, context) {
    if (nextElement.type !== 'container') {
      var props = assign({}, nextElement.props);
      ReactTkWindowServer.sendCommand({
        type: 'grid',
        key: this._rootNodeID,
        properties: props.grid,
      });
      delete props.grid;
      ReactTkWindowServer.sendCommand({
        type: 'configure',
        key: this._rootNodeID,
        properties: props,
      });
    }

    if (nextElement.props.children) {
      this.updateChildren(nextElement.props.children, transaction, context);
    }
  },

  unmountComponent: function() {
    this.unmountChildren();

    if (this._currentElement.type !== 'container') {
      ReactTkWindowServer.sendCommand({
        type: 'delete',
        key: this._rootNodeID,
      });
    }
  },

  getPublicInstance: function() {
    return this;
  },
});

module.exports = ReactTkComponent;

'use strict';

var ReactTkWindowServer = require('./ReactTkWindowServer');

var assign = require('react/lib/Object.assign');

function ReactTkComponent() {
  this._currentElement = null;
  this._renderedChildren = null;
  this._rootNodeID = null;
}

assign(ReactTkComponent.prototype, {
  construct: function(initialElement) {
    this._currentElement = initialElement;
  },

  mountComponent: function(id, transaction, context) {
    this._rootNodeID = id;

    var widgetType = this._currentElement.type;
    // widgetType needs to be capitalized for Tkinter
    widgetType = widgetType[0].toUpperCase() + widgetType.slice(1);

    ReactTkWindowServer.sendCommand({
      type: 'create',
      widgetType: widgetType,
      key: id,
    });
    this.receiveComponent(this._currentElement, transaction, context);
  },

  receiveComponent: function(nextElement, transaction, context) {
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
  },

  unmountComponent: function() {
    ReactTkWindowServer.sendCommand({
      type: 'delete',
      key: this._rootNodeID,
    });
  },

  getPublicInstance: function() {
    return this;
  },
});

module.exports = ReactTkComponent;

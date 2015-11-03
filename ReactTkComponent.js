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
    var props = assign({}, this._currentElement.props);
    ReactTkWindowServer.sendCommand({
      type: 'grid',
      key: id,
      properties: props.grid,
    });
    ReactTkWindowServer.sendCommand({
      type: 'configure',
      key: id,
      properties: props,
    });
  },

  receiveComponent: function(nextElement, transaction, context) {
    //
  },

  unmountComponent: function() {
    //
  },

  getPublicInstance: function() {
    return this;
  },
});

module.exports = ReactTkComponent;

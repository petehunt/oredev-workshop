var ReactTkWindowServer = require('./ReactTkWindowServer');

ReactTkWindowServer.sendCommand({
  type: 'create',
  key: 'myLabel',
  widgetType: 'Label',
});

ReactTkWindowServer.sendCommand({
  type: 'configure',
  key: 'myLabel',
  properties: {
    text: 'Hello world',
  },
});

ReactTkWindowServer.sendCommand({
  type: 'grid',
  key: 'myLabel',
  properties: {
    row: 0,
    column: 0,
  },
});

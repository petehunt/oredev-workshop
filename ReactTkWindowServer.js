'use strict';

var ChildProcess = require('child_process');
var EventEmitter = require('events').EventEmitter;

var p = ChildProcess.spawn('python', ['server.py']);
p.stdout.setEncoding('utf8');
p.stderr.setEncoding('utf8');

p.stdout.on('data', function(lines) {
  lines.trim().split('\n').forEach(function(line) {
    var message = JSON.parse(line);
    ReactTkWindowServer.events.emit(message.type, message);
  });
});

p.stderr.on('data', function(err) {
  console.error(err);
});

var ReactTkWindowServer = {
  events: new EventEmitter(),

  sendCommand: function(command) {
    p.stdin.write(JSON.stringify(command) + '\n');
  },
};

module.exports = ReactTkWindowServer;

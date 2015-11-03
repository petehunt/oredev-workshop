'use strict';

var React = require('react');

var render = require('./render');

//<label text="hello world" grid={{row: 0, column: 0}} />

var App = React.createClass({
  getInitialState: function() {
    setTimeout(function() {
      this.setState({text: 'goodbye world'});
    }.bind(this), 1000);

    return {text: 'hello world'};
  },

  render: function() {
    return React.createElement('label', {
      text: this.state.text,
      grid: {
        row: 0,
        column: 0,
      },
    });
  },
});

render(React.createElement(App));

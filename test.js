'use strict';

var React = require('react');

var render = require('./render');

//<label text="hello world" grid={{row: 0, column: 0}} />

var App = React.createClass({
  getInitialState: function() {
    setInterval(function() {
      this.setState({
        todos: this.state.todos.concat(['item ' + this.state.todos.length]),
      });
    }.bind(this), 1000);
    return {todos: ['item 1', 'item 2', 'item 3']};
  },

  render: function() {
    var items = this.state.todos.map(function(item, row) {
      return <label key={row} text={item} grid={{row: row, column: 0, columnspan: 2}} />;
    });

    return (
      <container>
        {items}
        <entry grid={{row: items.length, column: 0}} />
        <button
          text={'Add item #' + (items.length + 1)}
          grid={{row: items.length, column: 1}}
        />
      </container>
    );
  },
});

render(React.createElement(App));

'use strict';

var React = require('react');
var createClass = require('create-react-class');
var RouteHandler = require('./components/RouteHandler');
var PropTypes = require('./PropTypes');

exports.Nested = createClass({
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        { className: 'Nested' },
        'Nested'
      ),
      React.createElement(RouteHandler, null)
    );
  }
});

exports.Foo = createClass({
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Foo' },
      'Foo'
    );
  }
});

exports.Bar = createClass({
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Bar' },
      'Bar'
    );
  }
});

exports.Baz = createClass({
  render: function render() {
    return React.createElement(
      'div',
      { className: 'Baz' },
      'Baz'
    );
  }
});

exports.Async = createClass({
  statics: {
    delay: 10,

    willTransitionTo: function willTransitionTo(transition, params, query, callback) {
      setTimeout(callback, exports.Async.delay);
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'Async' },
      'Async'
    );
  }
});

exports.RedirectToFoo = createClass({
  statics: {
    willTransitionTo: function willTransitionTo(transition) {
      transition.redirect('/foo');
    }
  },

  render: function render() {
    return null;
  }
});

exports.RedirectToFooAsync = createClass({
  statics: {
    delay: 10,

    willTransitionTo: function willTransitionTo(transition, params, query, callback) {
      setTimeout(function () {
        transition.redirect('/foo');
        callback();
      }, exports.RedirectToFooAsync.delay);
    }
  },

  render: function render() {
    return null;
  }
});

exports.Abort = createClass({
  statics: {
    willTransitionTo: function willTransitionTo(transition) {
      transition.abort();
    }
  },

  render: function render() {
    return null;
  }
});

exports.AbortAsync = createClass({
  statics: {
    delay: 10,

    willTransitionTo: function willTransitionTo(transition, params, query, callback) {
      setTimeout(function () {
        transition.abort();
        callback();
      }, exports.AbortAsync.delay);
    }
  },

  render: function render() {
    return null;
  }
});

exports.EchoFooProp = createClass({
  render: function render() {
    return React.createElement(
      'div',
      null,
      this.props.foo
    );
  }
});

exports.EchoBarParam = createClass({
  contextTypes: {
    router: PropTypes.router.isRequired
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'EchoBarParam' },
      this.context.router.getCurrentParams().bar
    );
  }
});
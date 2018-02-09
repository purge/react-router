var React = require('react');
var createClass = require('create-react-class')
var RouteHandler = require('./components/RouteHandler');
var PropTypes = require('./PropTypes');

exports.Nested = createClass({
  render: function () {
    return (
      <div>
        <h1 className="Nested">Nested</h1>
        <RouteHandler />
      </div>
    );
  }
});

exports.Foo = createClass({
  render: function () {
    return <div className="Foo">Foo</div>;
  }
});

exports.Bar = createClass({
  render: function () {
    return <div className="Bar">Bar</div>;
  }
});

exports.Baz = createClass({
  render: function () {
    return <div className="Baz">Baz</div>;
  }
});

exports.Async = createClass({
  statics: {
    delay: 10,

    willTransitionTo: function (transition, params, query, callback) {
      setTimeout(callback, exports.Async.delay);
    }
  },

  render: function () {
    return <div className="Async">Async</div>;
  }
});

exports.RedirectToFoo = createClass({
  statics: {
    willTransitionTo: function (transition) {
      transition.redirect('/foo');
    }
  },

  render: function () {
    return null;
  }
});

exports.RedirectToFooAsync = createClass({
  statics: {
    delay: 10,

    willTransitionTo: function (transition, params, query, callback) {
      setTimeout(function () {
        transition.redirect('/foo');
        callback();
      }, exports.RedirectToFooAsync.delay);
    }
  },

  render: function () {
    return null;
  }
});


exports.Abort = createClass({
  statics: {
    willTransitionTo: function (transition) {
      transition.abort();
    }
  },

  render: function () {
    return null;
  }
});

exports.AbortAsync = createClass({
  statics: {
    delay: 10,

    willTransitionTo: function (transition, params, query, callback) {
      setTimeout(function () {
        transition.abort();
        callback();
      }, exports.AbortAsync.delay);
    }
  },

  render: function () {
    return null;
  }
});

exports.EchoFooProp = createClass({
  render: function () {
    return <div>{this.props.foo}</div>;
  }
});

exports.EchoBarParam = createClass({
  contextTypes: {
    router: PropTypes.router.isRequired
  },
  render: function () {
    return <div className="EchoBarParam">{this.context.router.getCurrentParams().bar}</div>;
  }
});

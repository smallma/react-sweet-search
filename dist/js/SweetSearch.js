'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _search = require('react-icons/lib/fa/search');

var _search2 = _interopRequireDefault(_search);

var _reactLoading = require('react-loading');

var _reactLoading2 = _interopRequireDefault(_reactLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require('../sass/SweetSearch.sass');

exports.default = _react2.default.createClass({
  displayName: 'SweetSearch',
  getInitialState: function getInitialState() {
    return {
      isInputActive: false,
      isInputReady: false,
      isBtnSearchClick: false,
      isBtnSearchReady: false,
      isDisableIconSearch: false,
      isDisableIconLoading: true
    };
  },
  componentWillMount: function componentWillMount() {
    if (typeof this.props.cancel === 'function') {
      // parse function endSearch to props function cancel from app.jsx
      this.props.cancel(this._endSearch);
    }
  },


  // Show Search
  _showSearch: function _showSearch() {
    var that = this;

    console.log('handleClick: enable input');
    this.setState({
      isInputActive: true,
      isBtnSearchClick: true
    });

    setTimeout(function () {
      that.setState({
        isInputReady: true,
        isBtnSearchClick: false,
        isBtnSearchReady: true
      });
    }, 250);
  },

  // End Search
  _endSearch: function _endSearch() {
    var that = this;
    var inputDom = _reactDom2.default.findDOMNode(this.refs.theInput);

    this.setState({
      isInputActive: false,
      isInputReady: false,

      isBtnSearchClick: true,
      isBtnSearchReady: true,

      isDisableIconSearch: false,
      isDisableIconLoading: true
    });

    setTimeout(function () {
      // empty input
      inputDom.value = '';

      that.setState({
        isBtnSearchClick: false,
        isBtnSearchReady: false
      });
    }, 250);
  },

  _handleSearch: function _handleSearch() {
    var that = this;
    var inputDom = _reactDom2.default.findDOMNode(this.refs.theInput);
    var inputValue = inputDom.value;

    this.setState({
      isBtnSearchClick: true,
      isBtnSearchReady: true
    });

    setTimeout(function () {
      that.setState({
        isBtnSearchClick: false,
        isDisableIconSearch: true,
        isDisableIconLoading: false
      });
    }, 250);

    if (typeof this.props.search === 'function') {
      this.props.search(inputValue, this._endSearch);
    } else {
      console.error('Props search is not a function');
    }
  },

  _clickEvents: function _clickEvents() {
    // Handle Search Event
    if (this.state.isInputReady) {
      this._handleSearch();
      return;
    }

    // Show Search Animation
    this._showSearch.apply(this);
    _reactDom2.default.findDOMNode(this.refs.theInput).focus();
  },

  _handleClick: function _handleClick() {
    this._clickEvents();
  },

  _handleKeyPress: function _handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('Submit by Enter');
      this._clickEvents();
    }
  },

  render: function render() {
    var inputClass = (0, _classnames2.default)({ 'active': this.state.isInputActive, 'ready': this.state.isInputReady });
    var btnClass = (0, _classnames2.default)('btn__search', { 'click': this.state.isBtnSearchClick, 'ready': this.state.isBtnSearchReady });
    var iconSearchClass = (0, _classnames2.default)('icon__search', { 'disable': this.state.isDisableIconSearch });
    var iconLoadingClass = (0, _classnames2.default)('icon__loading', { 'disable': this.state.isDisableIconLoading });

    return _react2.default.createElement(
      'div',
      { className: 'sweet__search' },
      _react2.default.createElement('input', { ref: 'theInput', className: inputClass, type: 'text', name: 'search', onKeyPress: this._handleKeyPress }),
      _react2.default.createElement(
        'div',
        { className: btnClass, onClick: this._handleClick },
        _react2.default.createElement(_search2.default, { className: iconSearchClass, color: '#e3e3e3' }),
        _react2.default.createElement(
          'div',
          { className: iconLoadingClass },
          _react2.default.createElement(_reactLoading2.default, { type: 'spinningBubbles', width: '33px' })
        )
      )
    );
  }
});

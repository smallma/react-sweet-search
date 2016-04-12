import React from 'react';
import classNames from 'classnames';

import ReactDOM from 'react-dom';
import FaSearch from 'react-icons/lib/fa/search';
import Loading from 'react-loading';


export default React.createClass({
  getInitialState() {
    return {
      isInputActive: false,
      isInputReady: false,
      isBtnSearchClick: false,
      isBtnSearchReady: false,
      // btnClass: 'btn__search',
      isDisableIconSearch: false,
      isDisableIconLoading: true
    };
  },

  componentWillMount() {
    if (typeof this.props.cancel === 'function') {
      // parse function endSearch to props function cancel from app.jsx
      this.props.cancel(this._endSearch);
    }
  },

  // Show Search
  _showSearch: function () {
    const that = this;

    console.log('handleClick: enable input')
    this.setState({
      isInputActive: true,
      isBtnSearchClick: true,
    });

    setTimeout(function () {
      that.setState({
        isInputReady: true,
        isBtnSearchClick: false,
        isBtnSearchReady: true,
      })
    }, 250);
  },

  // End Search
  _endSearch: function () {
    const that = this;
    const inputDom = ReactDOM.findDOMNode(this.refs.theInput);

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
        isBtnSearchReady: false,
      })
    }, 250);
  },

  _handleSearch: function () {
    const that = this;
    const inputDom = ReactDOM.findDOMNode(this.refs.theInput);
    const inputValue = inputDom.value;

    this.setState({
      isBtnSearchClick: true,
      isBtnSearchReady: true,
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

  _clickEvents: function () {
    // Handle Search Event
    if (this.state.isInputReady) {
      this._handleSearch();
      return;
    }

    // Show Search Animation
    this._showSearch.apply(this);
    ReactDOM.findDOMNode(this.refs.theInput).focus();
  },

  _handleClick: function() {
    this._clickEvents();
  },

  _handleKeyPress: function (e) {
    if (e.key === 'Enter') {
      console.log('Submit by Enter');
      this._clickEvents();
    }
  },

  render: function() {
    let inputClass = classNames({'active': this.state.isInputActive, 'ready': this.state.isInputReady})
    let btnClass = classNames('btn__search', {'click': this.state.isBtnSearchClick, 'ready': this.state.isBtnSearchReady});
    let iconSearchClass = classNames('icon__search', {'disable': this.state.isDisableIconSearch});
    let iconLoadingClass = classNames('icon__loading', {'disable': this.state.isDisableIconLoading});

    return (
      <div className="sweet__search">
        <input ref="theInput" className={inputClass} type="text" name="search" onKeyPress = {this._handleKeyPress}></input>
        <div className={btnClass} onClick={this._handleClick}>
          <FaSearch className={iconSearchClass} color='#e3e3e3'/>
          <div className={iconLoadingClass}>
            <Loading type='spinningBubbles' width='33px'/>
          </div>
        </div>
      </div>
    );
  }
});

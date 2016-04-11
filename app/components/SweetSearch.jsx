import React from 'react';
import ReactDOM from 'react-dom';
import FaSearch from 'react-icons/lib/fa/search';
import Loading from 'react-loading';


export default React.createClass({
  getInitialState() {
    return {
      inputClass: '',
      btnClass: 'btn__search',
      iconSearchClass: 'icon__search',
      iconLoadingClass: 'icon__loading disable',
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
      inputClass: 'active',
      btnClass: 'btn__search click'
    });

    setTimeout(function () {
      that.setState({
        inputClass: 'active ready',
        btnClass: 'btn__search ready'
      })
    }, 250);
  },

  // End Search
  _endSearch: function () {
    const that = this;
    const inputDom = ReactDOM.findDOMNode(this.refs.theInput);

    this.setState({
      inputClass: '',
      btnClass: 'btn__search ready click',
      iconSearchClass: 'icon__search',
      iconLoadingClass: 'icon__loading disable'
    });

    setTimeout(function () {
      // empty input
      inputDom.value = '';

      that.setState({btnClass: 'btn__search'})
    }, 250);
  },

  _handleSearch: function () {
    const that = this;
    const inputDom = ReactDOM.findDOMNode(this.refs.theInput);
    const inputValue = inputDom.value;

    this.setState({ btnClass: 'btn__search ready click'});

    setTimeout(function () {
      that.setState({
        btnClass: 'btn__search ready',
        iconSearchClass: 'icon__search disable',
        iconLoadingClass: 'icon__loading'
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
    if ('ready'.indexOf(this.state.inputClass) <= -1) {
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
    return (
      <div className="sweet__search">
        <input ref="theInput" className={this.state.inputClass} type="text" name="search" onKeyPress = {this._handleKeyPress}></input>
        <div className={this.state.btnClass} onClick={this._handleClick}>
          <FaSearch className={this.state.iconSearchClass} color='#e3e3e3'/>
          <div className={this.state.iconLoadingClass}>
            <Loading type='spinningBubbles' width='33px'/>
          </div>
        </div>
      </div>
    );
  }
});

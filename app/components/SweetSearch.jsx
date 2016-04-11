import React from 'react';
import FaSearch from 'react-icons/lib/fa/search';


export default React.createClass({
  getInitialState() {
    return {
      inputClass: '',
      btnClass: 'btn__search',
    };
  },

  // Show Search
  _showSearch: function () {
    const that = this;

    console.log('handleClick: enable input')
    this.setState({inputClass: 'active', btnClass: 'btn__search click'});

    setTimeout(function () {
      that.setState({inputClass: 'active ready', btnClass: 'btn__search ready'})
    }, 250);
  },

  // End Search
  _endSearch: function () {
    const that = this;

    this.setState({inputClass: '', btnClass: 'btn__search click'});
    setTimeout(function () {
      that.setState({btnClass: 'btn__search'})
    }, 250);
  },

  _handleSearch: function () {
    this._endSearch();
  },

  handleClick: function() {
    // Handle Search Event
    if ('ready'.indexOf(this.state.inputClass) <= -1) {
      this._handleSearch();
      return;
    }

    // Show Search Animation
    this._showSearch.apply(this);
  },

  render: function() {
    return (
      <div className="sweet__search">
        <input className={this.state.inputClass} type="text" name="search"></input>
        <div className={this.state.btnClass} onClick={this.handleClick}>
          <FaSearch />
        </div>
      </div>
    );
  }
});

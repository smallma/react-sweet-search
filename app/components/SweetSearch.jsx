import React from 'react';
import FaSearch from 'react-icons/lib/fa/search';


export default React.createClass({
  getInitialState() {
    return {
      inputClass: '',
      btnClass: 'btn__search',
    };
  },

  handleClick: function() {
    const that = this;

    // prevent
    if ('activ'.indexOf(this.state.inputClass) <= -1) {
      return;
    }

    console.log('handleClick: enable input')
    this.setState({inputClass: 'active', btnClass: 'btn__search click'});

    setTimeout(function () {
      that.setState({inputClass: 'active ready', btnClass: 'btn__search ready'})
    }, 250);
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

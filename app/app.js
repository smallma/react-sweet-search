import React from 'react';
import ReactDOM from 'react-dom';

import SweetSearch from "./components/SweetSearch.js";

// require('./sass/test.css');


const styles = {
  main: {
    width: 800,
    height: 600,
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
};

const searchFn = function(inputValue, endSearch) {
  console.log('inputValue: ' + inputValue);

  setTimeout(function () {
    endSearch();
  }, 2000);
}

const cancelFn = function (endSearch) {
  // sometimes needs to cancel search
}

ReactDOM.render(
  <div style={styles.main}>
    <SweetSearch search={searchFn} cancel={cancelFn} />
  </div>,
  document.getElementById("react")
);
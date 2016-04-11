import React from 'react';
import ReactDOM from 'react-dom';

import SweetSearch from "./components/SweetSearch.jsx";


const styles = {
  main: {
    width: 800,
    height: 600,
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
};

const searchFn = function(endSearch) {
  setTimeout(function () {
    endSearch();
  }, 2000);
}

ReactDOM.render(
  <div style={styles.main}>
    <SweetSearch search={searchFn} />
  </div>,
  document.getElementById("react")
);
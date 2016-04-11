import React from 'react';
import ReactDOM from 'react-dom';

import SweetSearch from "./components/SweetSearch.jsx";


const styles = {
  main: {
    width: 800,
    height: 600,
    backgroundColor: 'lightgray'
  }
};

ReactDOM.render(
  <div style={styles.main}>
    <SweetSearch />
  </div>,
  document.getElementById("react")
);
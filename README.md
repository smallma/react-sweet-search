# react-sweet-search

## Description
React based component Search. Enhance user experience of search.


## Preview
![alt tag](https://cloud.githubusercontent.com/assets/429250/14410807/5a3a68fc-ff6a-11e5-928a-e07914dd7674.gif)


## How to Use
Step 1:
npm install --save react-icons
npm install --save react-loading

Step 2:
  include SweetSearch.css in html

Step 3:
```js
import SweetSearch from "./components/SweetSearch.jsx";

const searchFn = function(endSearch) {
  endSearch(); // End Searching icon
}

ReactDOM.render(
  <div>
    <SweetSearch search={searchFn} />
  </div>,
  document.getElementById("react")
);
```


## License

MIT

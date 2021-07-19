import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import reportWebVitals from './reportWebVitals';
import App from "./pages/home/App";
ReactDOM.render(
  <React.StrictMode>
      {/*<Login/>,*/}
      {/*<Slider_1/>*/}
      {/*555dsaf555aaaaaaaaaa*/}
      <App></App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle }  from './style.js';
import { GlobalStyleIcon }  from './static/iconfont/iconfont';
import App from './App';


ReactDOM.render(
    <Fragment>
      <GlobalStyle />
      <GlobalStyleIcon />
      <App />
    </Fragment>, 
  document.getElementById('root'));



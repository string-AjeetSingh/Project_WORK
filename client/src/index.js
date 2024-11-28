import React from 'react';
import ReactDOM from 'react-dom/client';
import './Css/index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';


const ReactContainer = document.getElementsByTagName('ReactContainer');
console.log(ReactContainer);

const root = ReactDOM.createRoot(ReactContainer[0]);

root.render(
  <React.StrictMode>
    <div className='bg-gradient-to-br min-h-screen
    from-green-950  to-green-900'>

      <App />
    </div>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

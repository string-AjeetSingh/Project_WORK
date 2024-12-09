import React from 'react';
import ReactDOM from 'react-dom/client';
import './Css/index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

import reportWebVitals from './reportWebVitals';


const ReactContainer = document.getElementsByTagName('ReactContainer');
console.log(ReactContainer);

const root = ReactDOM.createRoot(ReactContainer[0]);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-2jpux8rtke6h2fat.us.auth0.com'
      clientId='jfARQSPc43O0AmlrYatdCbLlJzrd0Pth'
      authorizationParams={
        {
          redirect_uri: 'http://localhost:3000/'
        }
      }>

      <div className='bg-gradient-to-br min-h-screen
      h-[110vh]
    from-green-950  to-green-900'>

        <App />
      </div>
    </Auth0Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider, } from 'reactfire';


const firebaseConfig = {
  apiKey: "AIzaSyBupcovjF8lvURxJe46RSisbO74Igfe9YA",
  authDomain: "eatupapp-2e834.firebaseapp.com",
  projectId: "eatupapp-2e834",
  storageBucket: "eatupapp-2e834.appspot.com",
  messagingSenderId: "883038579089",
  appId: "1:883038579089:web:aabc3472360856b8091230",
  measurementId: "G-TGK1Z1W5VD"
};



ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

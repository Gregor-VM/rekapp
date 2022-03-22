import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store/store';

import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.scss';

import Home from './pages/Home';
import DeckPractice from './pages/DeckPractice';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/deck/:deckId/:cardIndex" component={DeckPractice}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import './index.css';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import App from './App';
import { rootReducer } from './store/reducers/rootReducer';
import { rootEpic } from './store/epics/rootEpics';
import ErrorBoundary from './hoc/ErrorBaundary';

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const baseUrl = '/'; //window.location.pathname
const baseUrl = process.env.REACT_APP_BASE_URL
console.log('base url:',baseUrl)

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()

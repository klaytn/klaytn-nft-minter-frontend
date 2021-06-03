import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Provider } from 'react-redux';

import './App.css';
import MyNav from './components/MyNav';
import Home from './pages/home';
import Mint from './pages/mint';

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer, { rootSaga } from './modules';
import login from './pages/login';
import ProtectedRoute from './components/ProtectedRoute';
import NftInfo from './pages/nftInfo';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Container>
        <MyNav />
        <Switch>
          <Redirect key='root-reroute' from="/" to='/home' exact />

          <ProtectedRoute path="/home" component={Home} exact />
          <ProtectedRoute path="/mint" component={Mint} />
          <ProtectedRoute path="/nft/:contractAddr/:id" component={NftInfo} />

          <Route path="/login" component={login} />
        </Switch>
      </Container>
    </BrowserRouter>
  </Provider>
);

export default App;

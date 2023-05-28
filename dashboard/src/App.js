// @flow

import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import store, {history} from './business/store';
import style_sheet from './App.css';
import Home from './views/shared/Home';
import Login from './views/scenes/Login';
import {ConnectedRouter} from 'connected-react-router'
import OrderPDFHTML from "./views/scenes/OrderPDFHTML";

function App() {
  return (
    <div className={style_sheet.container}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/pdf_html/:number" component={OrderPDFHTML}/>
            <Route path="/" component={Home}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    </div>

  )
}

export default App;

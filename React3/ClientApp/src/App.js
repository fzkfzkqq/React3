import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import SignIn from './components/Login'
import SignUp from './components/SignUp'
import ReactVirtualizedTable from './components/MuiVirtualizedTable'
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={SignIn} />
            <Route path='/counter' component={Counter} />
            <Route path='/signup' component={SignUp} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/table' component={ReactVirtualizedTable} />
      </Layout>
    );
  }
}

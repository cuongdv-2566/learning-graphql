import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

import logo from './logo.svg';
import './App.css';

const GET_COIN = gql`
  query {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`

const QueryList = () => {
  return (
    <Query query={GET_COIN}>
      {({ loading, error, data: { rates } }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;
        return (
          <ul>
            { rates.map(({ currency, rate }) => <li key={currency}><p>{currency}: {rate}</p></li>) }
          </ul>
        )
      }}
    </Query>
  );
}

const client = new ApolloClient({ uri: "https://48p1r2roz4.sse.codesandbox.io" });

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Apollo</h2>
        </header>
        <QueryList />
      </div>
    </ApolloProvider>
  );
}

export default App;

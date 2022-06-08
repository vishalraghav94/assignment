import logo from "./logo.svg";
import "./App.css";
import { Main } from "./Components/Main/Main.js";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  ApolloProvider,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, location, path }) => {
      alert(`graphql error : ${message}`);
    });
  }
});

// const link = from([
//   errorLink,
//   new HttpLink("http://smart-meeting.herokuapp.com"),
// ]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://smart-meeting.herokuapp.com/",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Main />
      </div>
    </ApolloProvider>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import client from './apolloClient';
import App from "./App";
import {AuthProvider} from './context/auth-context';
import './index.css'

// import "./index.css";


// The React application needs access to...
/**
 * Client
 * Authorization Context  (We have not made, add this later)
 * Browser Router (React Router) /login /register
 */


ReactDOM.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById("root")
);

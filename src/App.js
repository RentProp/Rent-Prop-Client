import React from "react";
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from "react-router-dom";
// import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {  Loading, PrivateRoute } from "./components";
import { Home, Profile, ExternalApi } from "./views";
// import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserHistory } from "history";
import Dashboard from "views/Search/Dashboard.js";
import ProfilePage from "views/Components/ProfilePage/ProfilePage.js";
import ChatBot from "views/ChatBot/ChatBot.js";
import CaptureDetails from "views/CaptureDetails/CaptureDetails.js"
import ListingPage from "views/ListingPage/ListingPage";
import Cart from "views/Cart/Cart";
import Checkout from "views/Cart/Checkout";
import NavBar from "views/Components/NavBar/NavBar"
import Footer from "components/Footer/Footer.js";
import Account from "layouts/Account.js";
import Admin from "layouts/Admin.js";
import Listing from "views/Components/ListingModal/Listing"
import "assets/css/material-dashboard-react.css?v=1.9.0";


function App() {
  
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="App">
      <NavBar />
        <Switch>
          <PrivateRoute path="/capture-details" component={CaptureDetails} />
          <Route path="/search" component={Dashboard} />
          <PrivateRoute path="/item/:id" component={ListingPage} />
          <PrivateRoute path="/account" component={Account} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/addListing" component={Listing} />
          <PrivateRoute path="/user/cart" component={Cart} />
          <PrivateRoute path="/user/checkout" component={Checkout} />
          <Redirect from="/" to="/search" />
        </Switch>
        <ChatBot />
      <Footer />
    </div>
  );
}

export default App;

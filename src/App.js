import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import {  Loading, PrivateRoute } from "./components";
import { Home, Profile, ExternalApi } from "./views";
// import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserHistory } from "history";
import Dashboard from "views/Search/Dashboard.js";
import ProfilePage from "views/Components/ProfilePage/ProfilePage.js";
import CaptureDetails from "views/CaptureDetails/CaptureDetails.js"
import ListingPage from "views/ListingPage/ListingPage";
import NavBar from "views/Components/NavBar/NavBar"
import Footer from "components/Footer/Footer.js";
import Account from "layouts/Account.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";


var hist = createBrowserHistory();

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
          <Route path="/listing" component={ListingPage} />
          <PrivateRoute path="/account" component={Account} />
          <PrivateRoute path="/external" component={ExternalApi} />
          <Redirect from="/" to="/search" />
        </Switch>
      <Footer />
    </div>
  );
}

export default App;

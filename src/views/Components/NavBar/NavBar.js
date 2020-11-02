import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PublicNavBar from "./PublicNavBar";
import PrivateNavBar from "./PrivateNavBar";
const NavBar = () => {
  const { isAuthenticated } = useAuth0();
  return <div>{isAuthenticated ? <PrivateNavBar /> : <PublicNavBar />}</div>;
};

export default NavBar;

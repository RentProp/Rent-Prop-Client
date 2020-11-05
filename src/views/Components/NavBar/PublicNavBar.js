import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Explore from "@material-ui/icons/Explore";
import Header from "components/Header/Header.js";
import {  Link } from "react-router-dom";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import profileImage from "assets/img/faces/avatar.jpg";
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import { useAuth0 } from "@auth0/auth0-react";
import {  LockOpen } from "@material-ui/icons";
import logo from "./logo192.png"

const useStyles = makeStyles(styles);

export default function PublicNavBar() {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();
  return (
        <Header
        brand={<Link to="/search"><img src={logo} alt="logo"  /> </Link>}

          color="danger"
          rightLinks={
            <List className={classes.list}>
              <ListItem className={classes.listItem}>
                <Button
                  className={classes.navLink}
                  onClick={() => loginWithRedirect()}
                  color="transparent"
                >
                  <LockOpen className={classes.icons} />
                  SIGN IN
                </Button>
              </ListItem>
            </List>
          }
        />
  );
}

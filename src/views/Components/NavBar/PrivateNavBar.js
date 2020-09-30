import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Explore from "@material-ui/icons/Explore";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Header from "components/Header/Header.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import ListingModal from "../ListingModal/Listing";
import logo from "./logo192.png"
const useStyles = makeStyles(styles);

export default function PrivateNavBar() {
  const classes = useStyles();
  const { user, logout } = useAuth0();
  const history = useHistory();

  const { email, picture } = user;
  const routeSearch = () => {
    let path = `/search`;
    history.push(path);
  };
  const routeAddItem = () => {
    let path = `/account/dashboard`;
    history.push(path);
  };
  
  const routeUserProfile = () => {
    let path = `/account/user`;
    history.push(path);
  };
  return (
    <Header
      brand={
        <img src={logo}  alt="logo" />
      }
      color="danger"
      rightLinks={
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <Button
              className={classes.navLink}
              onClick={routeSearch}
              color="transparent"
            >
              <Explore className={classes.icons} />
              Discover
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListingModal />
          </ListItem>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              caret={false}
              hoverColor="danger"
              dropdownHeader={email}
              buttonText={
                <img src={picture} className={classes.img} alt="profile" />
              }
              buttonProps={{
                className: classes.navLink + " " + classes.imageDropdownButton,
                color: "transparent",
              }}
              dropdownList={[
                <Button
                  className={classes.navLink}
                  onClick={routeUserProfile}
                  color="transparent"
                >
                  <AccountCircle className={classes.icons} />
                  My Account
                </Button>,
                <Button
                className={classes.navLink}
                onClick = {() =>
                  logout({
                    returnTo: window.location.origin,
                  })
                }
                color="transparent"
              >
                <ExitToApp className={classes.icons} />
                Logout
              </Button>,
              ]}
            />
          </ListItem>
        </List>
      }
    />
  );
}

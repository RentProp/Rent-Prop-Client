import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import {  Link } from "react-router-dom";
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
import { AddCircle, ShoppingCart } from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import logo from "./logo192.png";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles(styles);
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 0,
    top: 1,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);
export default function PrivateNavBar() {
  const classes = useStyles();
  const { user, getAccessTokenSilently } = useAuth0();
  const { logout } = useAuth0();

  const history = useHistory();

  const [isFetchingCart, setFetchingCart] = useState(true);
  const [numCartItems, setCartItems] = useState(0);

  const { email, picture } = user;
  const routeSearch = () => {
    let path = `/search`;
    history.push(path);
  };
  const routeCart = () => {
    let path = `/user/cart`;
    history.push(path);
  };
  const routeAddItems = () => {
    let path = `/addListing`;
    history.push(path);
  };

  const routeUserProfile = () => {
    let path = `/account/user`;
    history.push(path);
  };
  
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = await getAccessTokenSilently();
        fetch(`${apiUrl}/api/carts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setCartItems(res.length);
            setFetchingCart(false);
          })
          .catch((e) => console.log(e));
      } catch {
        console.log("Failed to get access token");
      }
    };
    if (isFetchingCart) {
      fetchCart();
    }
  });


  return (
    <Header
      brand={<Link to="/search"><img src={logo} alt="logo"  /> </Link>}
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
            <Button
              className={classes.navLink}
              onClick={routeAddItems}
              color="transparent"
            >
              <AddCircle className={classes.icons} />
              Add Item Listing
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              justIcon
              round
              href="#pablo"
              className={classes.notificationNavLink}
              onClick={routeCart}
              color="transparent"
            >
              <StyledBadge badgeContent={numCartItems} color="secondary">
                <ShoppingCart style={{ color: "white" }} />
              </StyledBadge>
            </Button>
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
                  style={{ width: "100%" }}
                >
                  <AccountCircle className={classes.icons} />
                  My Account
                </Button>,
                <Button
                  className={classes.navLink}
                  onClick={() =>
                    logout({
                      returnTo: window.location.origin,
                    })
                  }
                  color="transparent"
                  style={{ width: "100%" }}
                >
                  <ExitToApp className={classes.icons} />
                  Logout
                </Button>,
              ]}
            />
          </ListItem>
          <ListItem className={classes.listItem}></ListItem>
        </List>
      }
    />
  );
}

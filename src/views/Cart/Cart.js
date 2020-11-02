/* global google */
import { Redirect, useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "assets/jss/material-kit-react/views/components.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Maps from "./CartMap.js";
import DateTimeStyle from "assets/scss/plugins/_plugin-react-datetime.scss";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Visibility from "@material-ui/icons/Delete";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button";
import { useAuth0 } from "@auth0/auth0-react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import "./Cart.css";
import DateTimePicker from "components/DateTimePicker/DateTimePicker.js";
import moment from 'moment';
import Datetime from 'react-datetime';
import { Alert } from "react-bootstrap";
const cartStyles = {
  ...styles,
  rowContainer: { display: "flex", flexDirection: "row" },
  colContainer: { display: "flex", flexDirection: "Column" },
  compact: { margin: "auto" },
  imageFrame: { height: "100%", width: "100%", objectFit: "cover" },
  heavyFont: { margin: "auto", fontWeight: "bold" },
};

const useStyles = makeStyles(cartStyles);
const useDateTimeStyles = makeStyles(DateTimeStyle);

function CartListing(props) {
  const history = useHistory();
  const item = props.item;
  const itemid = item.id;
  const userid = props.user;
  const { getAccessTokenSilently } = useAuth0();
  const geocoder = new google.maps.Geocoder();
  const apiUrl = process.env.REACT_APP_API_URL;
  const classes = useStyles();
  const classesDateTime = useDateTimeStyles();
  const [isLoadingCoords, setLoadingCoords] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [coords, setCoords] = useState({ lat: 39.16, lng: -86.52 });
  useEffect(() => {
    if (isLoadingCoords) {
      geocoder.geocode({ address: item.address.address }, (result, status) => {
        if (status === "OK") {
          let location = result[0].geometry.location;
          setCoords({ lat: location.lat(), lng: location.lng() });
        } else {
          // Handle response failure
        }
        setLoadingCoords(false);
      });
    }
  });
  const callSecureApi = async (rentalProps) => {
    
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/api/itemrentals`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: rentalProps,
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        console.log("SUCCESSS");
        alert("You will recive about confirmation")
        history.push(window.location.origin);
      }
    });
  };
  const handleCheckout = (evt) => {
    evt.preventDefault();
    let rentalProps = JSON.stringify({
      begin_at: startDate,
      end_at: endDate,
      renter: userid,
      item : itemid
    });
    alert(rentalProps);
    callSecureApi(rentalProps);
  };

  const handleDeleteItem = async (id) => {
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/api/carts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        alert("Your item has been deleted");
        history.push(window.location.origin);
      }
    });
  };
  return (
    <Card>
      <CardBody>
        <form onSubmit={handleCheckout} style={{ width: "100%" }}>
          <GridContainer style={{ height: "100%", marginBottom: "15px" }}>
            <GridItem xs={2}>
              <img
                className={classes.imageFrame}
                src={item.pictures[0]}
                alt={`Item: ${item.name}`}
              />
            </GridItem>
            <GridItem xs={6} md={7}>
              <GridContainer>
                <GridItem xs={12}>
                  <h4 className={classes.heavyFont}>{item.name}</h4>
                  <h5 className={classes.compact}>
                    {" "}
                    {`${item.address.address} ${item.address.city}  ${item.address.state} ${item.address.country}`}{" "}
                  </h5>
                  <br></br>
                  <h5
                    className={classes.compact}
                    style={{ color: "#4caf50" }}
                  >{`$${item.price}`}</h5>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={4} md={3}>
              <Button
                style={{ width: "100%" }}
                color="success"
                type="submit"
                value="Submit"
              >
                Checkout!
              </Button>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={4}>
              <Datetime
                required
                onChange={(moment) => setStartDate(moment, "startDate")}
                className={classesDateTime}
                value={startDate}
                inputProps = {{
                placeholder:"Start Date",
                style: { marginTop: "23px"}
                
                }}
                
              />
            </GridItem>
            <GridItem xs={4}>
              <Datetime
                required
                onChange={moment => setEndDate(moment, "EndDate")}
                style = {{
                  marginTop: "23px"
                }}
                className={classesDateTime}
                value={endDate}
                inputProps = {{
                placeholder:"End Date",
              style: { marginTop: "23px"}}}
              />
            </GridItem>
            <GridItem xs={4}>
              <CustomInput
                labelText="Coupon Code"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (e) => setCouponCode(e.target.value),
                }}
                value={couponCode}
              />
            </GridItem>
          </GridContainer>
        </form>
        <GridContainer style={{ marginTop: "15px" }}>
          <GridItem xs={12}>
            <Maps coords={coords} />
          </GridItem>
          <GridItem xs={11}></GridItem>
          <GridItem xs={1}>
            <Tooltip title="Remove Item">
              <IconButton
                color="danger"
                aria-label="open drawer"
                onClick={() => handleDeleteItem(item.id)}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}

export default function ListingPage(props) {
  const classes = useStyles();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user, getAccessTokenSilently } = useAuth0();
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
            console.log(res);
            setItems(res);
            setLoading(false);
          })
          .catch((e) => console.log(e));
      } catch {
        console.log("Failed to get access token");
      }
    };
    if (isLoading) {
      fetchCart();
    }
  });

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={11} sm={10} md={10} lg={10}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Your Cart</h4>
            </CardHeader>
            <CardBody>
              {items.map((value) => {
                return <CartListing item={value.item} user={value.user} />;
              })}
              {items.length === 0 ? (
                <h5>
                  Looks Like your cart is empty, look around and add some items!
                </h5>
              ) : (
                <></>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

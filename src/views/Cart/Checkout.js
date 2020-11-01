/* global google */
import React, { useState, useEffect } from "react";
import styles from "assets/jss/material-kit-react/views/components.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Maps from "./CartMap.js";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Visibility from "@material-ui/icons/Delete";
import Button from "components/CustomButtons/Button";
import { useAuth0 } from "@auth0/auth0-react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import "./Cart.css";

const cartStyles = {
  ...styles,
  rowContainer: { display: "flex", flexDirection: "row" },
  colContainer: { display: "flex", flexDirection: "Column" },
  compact: { margin: "auto" },
  imageFrame: { height: "100%", width: "100%", objectFit: "cover" },
  heavyFont: { margin: "auto", fontWeight: "bold" },
};

const useStyles = makeStyles(cartStyles);

export default function CheckoutItem(props) {
  const item = props.item;
  const geocoder = new google.maps.Geocoder();
  const classes = useStyles();
  const [isLoadingCoords, setLoadingCoords] = useState(true);
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
  return (
    <Card>
      <CardBody>
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
            <Button style={{ width: "100%" }} color="success">
              Checkout!
            </Button>
          </GridItem>
        </GridContainer>
        <GridContainer style={{ height: "100%", marginBottom: "15px" }}>
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
        <GridContainer>
          <GridItem xs={12}>
            <Maps coords={coords} />
          </GridItem>
          <GridItem xs={11}>
          </GridItem>
          <GridItem xs={1}>
            <Tooltip title="Remove Item">
              <IconButton color="danger" aria-label="open drawer">
                <Visibility />
              </IconButton>
            </Tooltip>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}


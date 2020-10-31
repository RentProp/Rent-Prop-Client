import React, { useState, useEffect } from "react";
import styles from "assets/jss/material-kit-react/views/components.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";

import Button from "components/CustomButtons/Button";

import { useAuth0 } from "@auth0/auth0-react";

import "./Cart.css";

const cartStyles = {...styles, 
  rowContainer: {display: 'flex', flexDirection: 'row'}, 
  colContainer: {display: 'flex', flexDirection: 'Column'},
  compact: {margin: 'auto'},
  imageFrame: {height:'100%', width: '100%', objectFit:'cover'}
}

const useStyles = makeStyles(cartStyles);

function CartListing(props) {
  const item = props.item;
  const classes = useStyles();
  return (
    <Card>
      <CardBody style={{ height: "10vh" }}>
        <GridContainer style={{ height: "100%" }}>
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
                <h4 className={classes.compact}>{item.name}</h4>
              </GridItem>
              <GridItem xs={12}>
                <h6
                  className={classes.compact}
                  style={{ color: "#4caf50" }}
                >{`$${item.price}`}</h6>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={4} md={3}>
            <Button
              //className={classes.compact}
              style={{ maxWidth: "100%" }}
              color="success"
            >
              Checkout!
            </Button>
            <Button
              //className={classes.compact}
              style={{ maxWidth: "100%" }}
              color="danger"
            >
              Remove
            </Button>
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

  useEffect(()=>{
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
          .catch((e) => console.log(e));;
      } catch {
        console.log('Failed to get access token');
      }
    };
    if (isLoading) {
      fetchCart();
    }
  }
  );

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={11} sm={10} md={7} lg={7}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Your Cart</h4>
            </CardHeader>
            <CardBody>
              {items.map((value) => {
                return (<CartListing item={value.item} />)
              })}
              {(items.length === 0) ? <h4>Looks Like your cart is empty, look around and add some items!</h4> : <></>}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

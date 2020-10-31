import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useHistory } from "react-router-dom";

import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import Rating from "@material-ui/lab/Rating";
import { useAuth0 } from "@auth0/auth0-react";

import { cardTitle, cardSubtitle } from "assets/jss/material-kit-react.js";
import imagesStyles from 'assets/jss/material-kit-react/imagesStyles.js';
import ButtonBase from '@material-ui/core/ButtonBase';
import LocationIcon from '@material-ui/icons/GpsFixedRounded'


const styles = {
    ...imagesStyles,
    cardTitle,
    cardSubtitle,
    cardSpacing: {
        marginBottom: 2,
        marginTop: 2
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    m0: {
        margin: '0px'
    },
    mHalf: {
        margin: '0.5em'
    }
}

const useStyles = makeStyles(styles);

export default function Listing(props) {
  const history = useHistory();
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;

    const classes = useStyles();
    const redirectToItemPage = (id) => {
      console.log(id)
      let path = `/item/${id}`;
      history.push(path);
    };
    const handleAddToCart = async (id, userid) => {
      const token = await getAccessTokenSilently();
      let addItemToCart = {
        id,
        userid
      }
      fetch(`${apiUrl}/api/profiles/me/cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: addItemToCart
      }).then((response) => {
        if (!response.ok) {
          console.log("SOMETHING WENT WRONG");
        } else {
          alert("Your item has been added to cart");
          history.push(window.location.origin);
        }
      });
    };
    return (
      <GridItem xs={10} md={12}>
        <Card>
          <ButtonBase onClick = {()=> redirectToItemPage(props.id)}>
          <img
            style={{ height: "180px", width: "100%", display: "block" }}
            className={classes.imgCardTop}
            src={props.image}
            alt="Card-img-cap"
          />
          </ButtonBase>
          <CardBody>
            <h6 class={classes.cardTitle}>{props.title}</h6>
            <Rating
              name="listing-rating"
              value={5*(props.rating/100)}
              percision={0.1}
              size="large"
            />
            <div className={classes.row} style={{ marginBottom: "1em" }}>
              <LocationIcon className={classes.m0} />
              <p className={classes.m0} style={{ marginLeft: "0.5em" }}>
                {props.location}
              </p>
            </div>
            <div className={classes.row} style={{ justifyContent: "space-between" }}>
              <Button color="success" style={{ flexGrow: 0 }} onClick= {()=> handleAddToCart(props.id, props.userid)}>Add To Cart</Button>
              <p
                style={{
                  color: "#4caf50",
                  flexGrow: 0
                  //fontFamily: '"Roboto Slab", "Times New Roman", serif',
                }}
              >
                {"$" + props.price}
              </p>  
            </div>
          </CardBody>
        </Card>
      </GridItem>
    );
}
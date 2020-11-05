import React , {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useHistory } from "react-router-dom";

import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Check from "@material-ui/icons/Check";
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
  const [isItemDeleteTrue, setDelete] = useState(false);
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;

    const classes = useStyles();
    const redirectToItemPage = (id) => {
      console.log(id)
      let path = `/item/${id}`;
      history.push(path);
    };
    const handleAddToCart = async (id, userid) => {
      if(isAuthenticated){
      const token = await getAccessTokenSilently();
      let addItemToCart = JSON.stringify({
        item: id,
        user_id: userid
      })
      fetch(`${apiUrl}/api/carts`, {
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
         setDelete(true)
        }
      });
    }
  else{
    alert("Login to continue!")
  }};
  const addCart = () => {
    if (isItemDeleteTrue) {
      return true
    }
    else{
      return false
    }
  }
    return (
      
      <GridItem xs={3} md={3}>
        {/* {addCart() ? 
        <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> Item has been added to your cart...
          </span>
        }
        close
        color="success"
        icon={Check}
      />
       : ""} */}
        <Card>
          <ButtonBase onClick = {()=> redirectToItemPage(props.id)}>
          <img
            style={{ height: "180px", width: "100%", display: "block" , objectFit : "contain"}}
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
              <Button color="danger" style={{ flexGrow: 0 }} onClick= {()=> handleAddToCart(props.id, props.userid)}>Add To Cart</Button>
              <p
                style={{
                  color: "#f44336",
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
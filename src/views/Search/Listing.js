import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import Rating from "@material-ui/lab/Rating";

import { cardTitle, cardSubtitle } from "assets/jss/material-kit-react.js";
import imagesStyles from 'assets/jss/material-kit-react/imagesStyles.js';

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

    const classes = useStyles();
    
    return (
      <GridItem xs={10} md={12}>
        <Card>
          <img
            style={{ height: "180px", width: "100%", display: "block" }}
            className={classes.imgCardTop}
            src={props.image}
            alt="Card-img-cap"
          />
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
              <Button color="success" style={{ flexGrow: 0 }}>Add To Cart</Button>
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
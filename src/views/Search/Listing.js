import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

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
    },
    fullWidth: {
        width: '100%'
    }
}

const useStyles = makeStyles(styles);

export default function Listing(props) {

    const classes = useStyles();
    
    
    return (
      <GridItem xs={10} md={3}>
        <Card>
          <img
            style={{ height: "180px", width: "100%", display: "block" }}
            className={classes.imgCardTop}
            src="https://via.placeholder.com/200"
            alt="Card-img-cap"
          />
          <CardBody style={{display: "flex", flexDirection: "column"}}>
            <h6 class={classes.cardTitle}>{props.title}</h6>
            <div className={classes.row} style={{ marginBottom: "1em" }}>
              <LocationIcon className={classes.m0} />
              <p className={classes.m0} style={{ marginLeft: "0.5em" }}>
                {props.location}
              </p>
            </div>
            <h5
              className={classes.cardSubtitle}
              style={{
                color: "#4caf50",
                //fontFamily: '"Roboto Slab", "Times New Roman", serif',
              }}
            >
              {"$" + props.price}
            </h5>
            <p className={classes.mHalf}>{props.rating + "%"}</p>
            <Button className={classes.fullWidth} color="success">
              Add To Cart
            </Button>
          </CardBody>
        </Card>
      </GridItem>
    );
}
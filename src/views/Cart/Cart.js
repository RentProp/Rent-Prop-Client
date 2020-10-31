import React, { useState, useEffect } from "react";
import styles from "assets/jss/material-kit-react/views/components.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CartCard from "./CartCard"
const useStyles = makeStyles(styles);

export default function ListingPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>

      <h2>Your Cart</h2>
        <CartCard />
    </div>
  );
}

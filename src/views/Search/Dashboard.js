import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import SectionDownload from "./SectionDownload.js"

import styles from "assets/jss/material-kit-react/views/components.js";
import CaptureDetails from "../CaptureDetails/CaptureDetails"
const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Parallax image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Material Kit React.</h1>
                <h3 className={classes.subtitle}>
                  A Badass Material-UI Kit based on Material Design.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionDownload />
      </div>
    </div>
  );
}

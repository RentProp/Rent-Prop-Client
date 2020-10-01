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
import CustomInput from "components/CustomInput/CustomInput.js";
import SectionDownload from "./SectionDownload.js"

import styles from "assets/jss/material-kit-react/views/components.js";
import CaptureDetails from "../CaptureDetails/CaptureDetails"
import { whiteColor } from "assets/jss/material-dashboard-react.js";
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
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
                <TextField
                  id="search-bar"
                  placeholder="rent anything, anywhere noww"
                  style={{color: whiteColor}}
                  variant="outlined"
                  fullWidth
                  autoFocus
                  InputProps={{
                    classes: {input: classes.title},
                    style: {color: whiteColor}
                  }}
                /> 
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

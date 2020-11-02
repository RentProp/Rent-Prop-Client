/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// core components
import styles from "assets/jss/material-kit-react/views/componentsSections/downloadStyle.js";
import Listing from "./Listing";

const useStyles = makeStyles(styles);

export default function SectionDownload() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <Listing
            title="Luddy School of Informatics, Computing, and Engineering"
            price="1,000.99"
            rating={74}
            location="700 N Woodlawn Ave, Bloomington, IN 47408"
          />
          <Listing
            title="Luddy School of Informatics, Computing, and Engineering"
            price="1,000.99"
            rating={74}
            location="700 N Woodlawn Ave, Bloomington, IN 47408"
          />
          <Listing
            title="Luddy School of Informatics, Computing, and Engineering"
            price="1,000.99"
            rating={74}
            location="700 N Woodlawn Ave, Bloomington, IN 47408"
          />
          <Listing
            title="Luddy School of Informatics, Computing, and Engineering"
            price="1,000.99"
            rating={74}
            location="700 N Woodlawn Ave, Bloomington, IN 47408"
          />
        </GridContainer>
        <div className={classes.textCenter + " " + classes.sharingArea}>
          <GridContainer justify="center">
            <h3>Thank you for supporting us!</h3>
          </GridContainer>
          <Button color="twitter">
            <i className={classes.socials + " fab fa-twitter"} /> Tweet
          </Button>
          <Button color="facebook">
            <i className={classes.socials + " fab fa-facebook-square"} /> Share
          </Button>
          <Button color="google">
            <i className={classes.socials + " fab fa-google-plus-g"} />
            Share
          </Button>
          <Button color="github">
            <i className={classes.socials + " fab fa-github"} /> Star
          </Button>
        </div>
      </div>
    </div>
  );
}

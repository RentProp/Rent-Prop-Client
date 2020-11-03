import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import { cardTitle } from "assets/jss/material-kit-react.js";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
const styles = {
  ...imagesStyles,
  cardTitle,
  textMuted: {
    color: "#6c757d",
  },
};

const useDateTimeStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const useStyles = makeStyles(styles);

export default function CartCard() {
  const classes = useStyles();
  const dateTimeClasses = useDateTimeStyles();
  return (
    <div>
      <Card>
        <img
          className={classes.imgCardTop}
          src="assets/img/bg4.jpg"
          alt="Card-img-cap"
        />
        <CardBody>
          <h4 className={classes.cardTitle}>Card title</h4>
          <p>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <br />

          <form className={dateTimeClasses.container} noValidate>
            <GridContainer style={{ width: "100%" }}>
              <GridItem xs={12} sm={12} md={4}>
                <TextField
                  style={{ width: "100%" }}
                  id="datetime-local"
                  label="Start Date"
                  type="datetime-local"
                  className={dateTimeClasses.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <TextField
                  style={{ width: "100%" }}
                  id="datetime-local"
                  label="End Date"
                  type="datetime-local"
                  className={dateTimeClasses.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  color="danger"
                  id="submit"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Rent Noww
                </Button>
              </GridItem>
            </GridContainer>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

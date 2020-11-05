/* global google */
import React, { useState, useEffect } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useHistory } from "react-router-dom";

import ButtonBase from '@material-ui/core/ButtonBase';
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/GpsFixedRounded";
import { cardTitle } from "assets/jss/material-kit-react.js";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import Input from "@material-ui/core/Input";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Loading } from "../../components";
import { storage } from "../Components/ListingModal/Firebase";
import { useAuth0 } from "@auth0/auth0-react";
import Maps from "./OrderMap.js";
import Tooltip from "@material-ui/core/Tooltip";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function Cards(props) {
  const history = useHistory();
  const { user, getAccessTokenSilently } = useAuth0();
  const classes = useStyles();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isLoadingTrue, setLoading] = useState("False");
  const [coords, setCoords] = useState({ lat: 39.16, lng: -86.52 });
  const [isLoadingCoords, setLoadingCoords] = useState(true);
  const geocoder = new google.maps.Geocoder();
  useEffect(() => {
    if (isLoadingCoords) {
      geocoder.geocode(
        { address: props.itemObject.address.address },
        (result, status) => {
          if (status === "OK") {
            let location = result[0].geometry.location;
            setCoords({ lat: location.lat(), lng: location.lng() });
          } else {
            // Handle response failure
          }
          setLoadingCoords(false);
        }
      );
    }
  });
  const viewItem = (id) => {
    let path = `/item/${id}`;
    history.push(path);
  };
  const redirectTo = (link) => {
    window.open(link, "_blank");
  };

  return (
    <Card style={{ margin: "5px", width: "20%"  }}>
      <img
        style={{ height: "180px", width: "100%", display: "block" ,
        objectFit: "contain" }}
        className={classes.imgCardTop}
        src={props.itemObject.pictures[0]}
        alt="Card-img-cap"
      />
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={10} md={10}>
            <h4 className={classes.cardTitle}>{props.itemObject.name}</h4>
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <Tooltip title="Navigate to Location">
              <IconButton
                color="danger"
                aria-label="open drawer"
                onClick={() =>
                  redirectTo(props.itemObject.address.google_map_link)
                }
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <p>Stat Date {props.begin_at}</p>
            <p>End Date {props.end_at}</p>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
              <Maps coords={coords} />
            
          </GridItem>
        </GridContainer>

        <Button color="danger" onClick={() => viewItem(props.itemObject.id)} style = {{width:"100%", marginTop: "15px"}}>
          View Item
        </Button>
      </CardBody>
    </Card>
  );
}

/* global google */
// Functions and Such imports
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";

// Component Imports
import { Loading } from "../../../src/components";
import MultiMap from "views/Maps/MultiMap";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Style imports
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function UserMap(props) {
    const geocoder = new google.maps.Geocoder();
    const apiUrl = process.env.REACT_APP_API_URL;
    
    const { user, getAccessTokenSilently } = useAuth0();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [coords, setCoords] = useState([]);
    const classes = useStyles();

    // Array to store locations temporarily until ready to update coords via setCoords
    const temp = [];

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = await getAccessTokenSilently();
                let id = localStorage.getItem("userid");
                fetch(`${apiUrl}/api/items?seller=${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                })
                .then((res) => res.json())
                .then((res) => {
                  res.forEach(item => getCoordsFromItem(item, res.length))
                })
            } catch {
                console.log('Failed to get Access Token');
            }
        }

        const getCoordsFromItem = (item, itemsLength) => {
          geocoder.geocode({ address: item.address.address }, (result, status) => {
            if (status === "OK") {
              let location = result[0].geometry.location;
              temp.push({ lat: location.lat(), lng: location.lng() });
              if (temp.length === itemsLength) {
                setCoords(temp);
                setIsLoading(false);
              }
            } else {
              setIsError(true);
              setIsLoading(false);
            }
          });   
        } 

        if (isLoading) {
            fetchItems();
        }
    })
    
    return (<Card>
      <CardHeader color="danger">
        <h4 className={classes.cardTitleWhite}>Your Map</h4>
        <p className={classes.cardCategoryWhite}>
          The location of all the items you have available for rent
        </p>
      </CardHeader>
      <CardBody>
        {
          (isLoading) ? (
            <Loading />
          ) : isError ? (
            <h1>Error getting the locations of your items, please try again</h1>
          ) : (
            <MultiMap coords={coords} />
          )
        }        
      </CardBody>
    </Card>)
    
  
}
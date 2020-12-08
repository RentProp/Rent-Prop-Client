import { Grid } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import React, { useState, useEffect } from 'react'
import Listing from 'views/Search/Listing';



export default function RelatedSection(props) {
    let apiUrl = process.env.REACT_APP_API_URL;
    let userId = localStorage.getItem("userid");

    const [listings, setListings] = useState([]);
    const [loadingListings, setLoading] = useState(true)

    useEffect(() => {
        let requestUrl = `${apiUrl}/api/items?category=${props.category}&type=${props.type}`;
        if (loadingListings) {
            fetch(requestUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("response data:");
                console.log(data);
                setListings(data);
                setLoading(false);
                //setItems((previndex) => data);
              });
        }
    });

    return (
      <GridContainer>
        {listings.length > 0 ? (
          listings.map((item) => (
            <Listing
              title={item.name}
              price={item.price}
              rating={item.avg_rating}
              location={item.address.city}
              image={item.pictures}
              userid={userId}
              id={item.id}
            />
          ))
        ) : (
          <p>
            Looks like this is the only {props.category} / {props.type} item up
            for rent!
          </p>
        )}
      </GridContainer>
    );

}
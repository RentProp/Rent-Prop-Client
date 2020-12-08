/* global google */
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "assets/jss/material-kit-react/views/components.js";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js'
import CardBody from 'components/Card/CardBody';
import Pagination from 'components/Pagination/Pagination';
import Button from 'components/CustomButtons/Button.js';
import DateTimePicker from 'components/DateTimePicker/DateTimePicker.js';
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import NavPills from 'components/NavPills/NavPills.js'
import Listing from 'views/Search/Listing.js';
import OurRating from 'components/Rating/OurRating.js';
import Success from 'components/Typography/Success';
import Danger from 'components/Typography/Danger';
import ReviewSection from './ReviewSection';
import DetailsTable from './DetailsTable';
import Maps from 'views/Maps/Maps.js';
import { Loading } from "../../../src/components";
import RelatedSection from './RelatedSection';

const types = {
  PackersAndMovers: "Packers and Movers",
  ElectrialAppliances : "Electrical Appliances",
  AirBallon: "Air Balloon"
};

const categories = {
  realestate: 'Real Estate and Property',
  vehicles: 'Vehicles',
  services: 'Staffing and Serviecs',
  others: 'Appliances and Other Items'
};

const pageStyles = {...styles, ...imagesStyles,
    imgFrame: { width: '100%', height: '100%', objectFit: 'contain'}, 
    textCenter: { textAlign: "center" }, 
    img: {maxWidth: '100%'},
    mb0: {marginBottom: 0},
    mt0: {marginTop: 0},
    TabPageContainer: { maxHeight: "60vh", overflowY: "auto" }
}

const defaultListing = {
  name: "Default Item Name",
  address: {
    address: "",
    city: "",
    country: "",
    google_map_link: "",
    state: "",
    zip: "",
  },
  brand: "Default Item Brand",
  category: "Default Item Category",
  company: "Default Company",
  description: "This is default object. Very Nice!",
  seller: 1,
  reviews: [],
  price: "0.00",
  pictures: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/250",
  ],
  type: "Default Item Type",
};

const useStyles = makeStyles(pageStyles);

export default function ListingPage(props) {
    const classes = useStyles();
    const geocoder = new google.maps.Geocoder();
    const apiUrl = process.env.REACT_APP_API_URL;

    const { getAccessTokenSilently, isAuthenticated } = useAuth0();


    const { id } = useParams();
    let userid = localStorage.getItem("userid");
    // Hooks
    const [isLoading, setLoading] = useState(true);
    const [listing, setListing] = useState(defaultListing);
    const [isLoadingCoords, setLoadingCoords] = useState(true);
    const [coords, setCoords] = useState({ lat: 39.16, lng: -86.52 });
    const [currentImage, setImage] = useState(0);    
    
    useEffect(() => {
      if (isLoading) {
        fetch(`${apiUrl}/api/items/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setListing(res);
            setLoading(false);
          })
          .catch((e) => console.log(e));
      } else {
        if (isLoadingCoords) {
          geocoder.geocode({address: listing.address.address}, (result, status) => {
            if (status==="OK") {
              let location = result[0].geometry.location;
              setCoords({ lat: location.lat(), lng: location.lng()});
            } else {
              // Handle response failure     
            }
            setLoadingCoords(false);
          });
        }
      }
    },);

    const getPages = (images) => { 
        let pages = []; 
        for (let i = 0; i < images.length; i++) {
            pages.push({ text: i + 1, onClick: () => setImage(i)});
        }
        return pages;
    };

     const handleAddToCart = async (id, userid) => {
      if(isAuthenticated){
        const token = await getAccessTokenSilently();
        let addItemToCart = JSON.stringify({
          item: id,
          user_id: userid
        })
        fetch(`${apiUrl}/api/carts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: addItemToCart
        }).then((response) => {
          if (!response.ok) {
            console.log("SOMETHING WENT WRONG");
          } else {
            alert(`Added ${listing.name} to cart!`)
          }
        });
      }
    }

    return isLoading ? (
      <Loading />
    ) : (
      <div className={classes.container}>
        <GridContainer>
          <GridItem md={12}>
            <div style={{ display: "flex" }}>
              <span>{categories[listing.category]}</span>
              <span style={{ margin: "0px 4px 0px 4px" }}>/</span>
              <span>
                {Object.keys(types).includes(listing.type)
                  ? types[listing.type]
                  : listing.type}
              </span>
            </div>
          </GridItem>
          <GridItem xs={6} md={4} style={{ height: "50vh" }}>
            <Card
              className={classes.textCenter}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "80%",
                padding: 10,
              }}
            >
              <img
                className={classes.imgCard}
                style={{ maxHeight: "100%", objectFit: "contain" }}
                src={listing.pictures[currentImage]}
                alt="listing"
              />
            </Card>
            <Pagination pages={getPages(listing.pictures)} />
          </GridItem>
          <GridItem xs={6} md={5} style={{ height: "60vh" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <h1 className={classes.mb0}>{listing.name}</h1>
              <OurRating
                name="listing-page-rating"
                rating={listing.avg_rating}
                disabled
              />
              <p>{listing.company}</p>
              <p style={{ overflowY: "scroll" }}>{listing.description}</p>
            </div>
          </GridItem>
          <GridItem md={3}>
            <Card>
              <CardBody>
                <Danger>
                  <h3 className={classes.mb0}>${listing.price}</h3>
                </Danger>
                <Success>
                  <h5 className={classes.mt0 + " " + classes.mb0}>In Stock</h5>
                </Success>
                <Button
                  color="success"
                  style={{ marginTop: "15px" }}
                  onClick={() => handleAddToCart(id, userid)}
                >
                  Add To Cart
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={12}>
            <div className={classes.TabPageContainer}>
              <ReviewSection id={id} />
            </div>
          </GridItem>
          <GridItem md={12} style={{ height: "50vh" }}>
            {isLoadingCoords ? <Loading /> : <Maps coords={coords} />}
          </GridItem>
          <GridItem md={12}>
            <h3>Related Listings</h3>
            <div className={classes.TabPageContainer}>
              <RelatedSection category={listing.category} type={listing.type} />
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
}

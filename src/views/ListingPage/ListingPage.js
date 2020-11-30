/* global google */
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

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



const pageStyles = {...styles, ...imagesStyles,
    imgFrame: { width: '100%', height: '100%', objectFit: 'contain'}, 
    textCenter: { textAlign: "center" }, 
    img: {maxWidth: '100%'},
    mb0: {marginBottom: 0},
    mt0: {marginTop: 0},
    TabPageContainer: { height: "80vh", overflowY: "scroll"}
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

    const { id } = useParams();
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

    return (isLoading) ? <Loading /> : (
      <div className={classes.container}>
        <GridContainer>
          <GridItem md={12}>
            <div style={{ display: "flex" }}>
              <a>{listing.type}</a>
              <span style={{ margin: "0px 4px 0px 4px" }}>/</span>
              <a>{listing.category}</a>
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
              <OurRating name="listing-rating" rating={5} disabled />
              <a>{listing.company}</a>
              <p style={{overflowY: 'scroll'}}>{listing.description}</p>
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
                <DateTimePicker
                  label="Rent on..."
                  placeholder="Choose a date to begin renting"
                />
                <Button color="success" style={{ marginTop: "15px" }}>
                  Add To Cart
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={12}>
            <NavPills
              color="danger"
              tabs={[
                {
                  tabButton: "Reviews",
                  tabContent: (
                    <>
                      <h3>Reviews</h3>

                      <div className={classes.TabPageContainer}>
                        <ReviewSection id={id} />
                      </div>
                    </>
                  ),
                },
                {
                  tabButton: "Related",
                  tabContent: (
                    <>
                      <h3>Related Listings</h3>
                      <div className={classes.TabPageContainer}>
                        <GridContainer
                          style={{ width: "100%", height: "100%" }}
                        >
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
                      </div>
                    </>
                  ),
                },
                {
                  tabButton: "View On Map",
                  tabContent: (
                    <>
                      <h3>Map View</h3>
                      {isLoadingCoords ? <Loading /> : <Maps coords={coords} />}
                    </>
                  ),
                },
              ]}
            ></NavPills>
          </GridItem>
        </GridContainer>
      </div>
    );
}

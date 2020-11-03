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
import StyledRating from 'components/Rating/StyledRating.js';
import Success from 'components/Typography/Success';
import Danger from 'components/Typography/Danger';
import Review from './Review';
import DetailsTable from './DetailsTable';
import Maps from 'views/Maps/Maps.js';



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
      console.log(process.env);
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

    return (
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
              <StyledRating name="listing-rating" rating={74} />
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
                        <Review
                          rating={72}
                          title="Unmissable"
                          text="Astonishing classic, each one of its ten songs provides a profound portrait of its time and of the people enduring it, and this grabs you from different perspectives and in different shapes. It grows old with you, I must say we both have grown old quite beautifully.
                                  It includes one of the most delicate and versatile songs in rock history, 'There is a light that never goes out'.
                                  I'm glad I celebrated its 30th birthday with this new vinyl.
                                  review image"
                          author="Isabel G"
                        />
                        <Review
                          rating={60}
                          title="Wow!"
                          text="The only Smiths album I owned & loved was Meat is Murder - don't know why I'd never looked into their other stuff, but after reading some reviews, decided to buy Queen is Dead. I played it, then immediately played it again, then played several cuts, then played the whole thing again, and wondered why I'd deprived myself of this LP for over 20 yrs! The title cut just takes off...left me breathless. Frankly Mr. Shankly is hilarious. My personal favorite is Bigmouth Strikes Again. The ballads are stunning - can't think of one downside to this LP & the digital remastering is a plus. The Smiths excel in exposing our white underbelly - Morrissey's lyrics always nail that tender spot we don't always allow others to see, plus he has that dry wit. Like good literature, the music isn't defined by the decade in which it was written. It doesn't sound dated today & would also have been at home in the 60s or 70s. I Know It's Over could have been written in the 40s or 50s & those painful lyrics almost beg for a smoke filled bar & a bottle of scotch. This is an album I'll be returning to again & again."
                          author="PK"
                        />
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
                      <Maps coords={coords} />
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

/*
  <GridItem md={8}>
            <Card>
              <CardBody>
                <h3>Additional Information</h3>
                <h5>Product Description</h5>
                <p>
                  {listing.description}
                </p>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem md={4}>
            <Card>
              <CardBody>
                <h3>Product Details</h3>
                <DetailsTable
                  details={{
                    Department: "Mens",
                    "Date First Available": "November 21, 2018",
                    Manufacture: "OTSBO Old Time Sports Booking",
                    ASIN: "B07KS228KQ",
                    "RentNoww Best Seller's Rank":
                      "#5,408 in Sports & Outdoors",
                  }}
                />
              </CardBody>
            </Card>
          </GridItem>
 */
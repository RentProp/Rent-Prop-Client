import React, { useState } from 'react';

import styles from "assets/jss/material-kit-react/views/components.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js'
import { card } from 'assets/jss/material-dashboard-react';
import CardBody from 'components/Card/CardBody';
import Pagination from 'components/Pagination/Pagination';
import { successColor } from 'assets/jss/material-dashboard-react';
import Button from 'components/CustomButtons/Button.js';
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import Listing from 'views/Search/Listing.js'

var pageStyles = {...styles, ...imagesStyles,
    contain: { objectFit: 'contain'}, 
    textCenter: { textAlign: "center" }, 
    img: {maxWidth: '100%'},
    mb0: {marginBottom: 0}
}

const useStyles = makeStyles(pageStyles);

export default function ListingPage(props) {
    const classes = useStyles();
    const [currentPage, setPage] = useState(0);
    
    const getPages = (images) => { 
        let pages = []; 
        for (let i = 0; i < images.length; i++) {
            pages.push({ text: i + 1, onClick: () => setPage(i)});
        }
        return pages;
    };

    const images = [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/250",
      "https://via.placeholder.com/350",
    ];

    return (
      <div className={classes.container}>
        <Card>
          <CardBody>
            <GridContainer>
              <GridItem md={4}>
                <Card className={classes.textCenter}>
                  <CardBody className={classes.contain}>
                    <img
                      className={classes.img}
                      src={images[currentPage]}
                      alt="listing"
                    />
                  </CardBody>
                </Card>
                <Pagination
                  style={{ margin: "auto" }}
                  pages={getPages(images)}
                ></Pagination>
              </GridItem>
              <GridItem md={5}>
                <h1 className={classes.mb0}>Item Name</h1>
                <a>Seller</a>
                <p>Rating</p>
              </GridItem>
              <GridItem md={3}>
                <Card>
                  <CardBody>
                    <h3 className={classes.mb0}>$1017.99</h3>
                    <h6 style={{ color: successColor }}>In Stock</h6>
                    <Button color="success">Add To Cart</Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem md={8}>
                <p>
                  Here is a paragraph of information about this item isnt this
                  cool? I really hope so here is some more random typing. You
                  want even more random typing?? I got you here. Read this if
                  you dare, I reccomend not to because it doesn't get any more
                  meaningful as you go on. In fact I think that I've typed
                  enough here, let's see how it looks!
                </p>
              </GridItem>
              <GridItem md={12}>
                <h3>Related Listings...</h3>
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
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </div>
    );
}
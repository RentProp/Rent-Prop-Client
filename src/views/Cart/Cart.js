import React, { useState, useEffect } from "react";
import styles from "assets/jss/material-kit-react/views/components.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CartCard from "./CartCard"
const useStyles = makeStyles(styles);

export default function ListingPage(props) {
  const classes = useStyles();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user, getAccessTokenSilently } = useAuth0();
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchCart = async () => {
      try {
        const token = await getAccessTokenSilently();
        fetch(`${apiUrl}/api/carts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setItems(res);
            setLoading(false);
          })
          .catch((e) => console.log(e));;
      } catch {
        console.log('Failed to get access token');
      }
    };
    if (isLoading) {
      fetchCart();
    }
  }
  );

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={11} sm={10} md={7} lg={7}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Your Cart</h4>
            </CardHeader>
            <CardBody>
              {items.map((value) => {
                return (<CartListing item={value.item} />)
              })}
              {(items.length === 0) ? <h4>Looks Like your cart is empty, look around and add some items!</h4> : <></>}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

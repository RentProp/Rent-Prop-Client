import { Redirect, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import BugReport from "@material-ui/icons/BugReport";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "../../../src/components";
import CardBody from "components/Card/CardBody.js";
import Listing from "./PastCard";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const history = useHistory();
  const { user, getAccessTokenSilently } = useAuth0();
  const [items, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isLoadingTrue, setLoading] = useState("False");

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        let userid = localStorage.getItem("userid");
        let result = await fetch(`${apiUrl}/api/itemrentals?seller=${userid}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const res = await result.json();
        console.log(res);
        await setData((previndex) => res);
      } catch {}
    })(items);
  }, [user.sub]);
  if (isLoadingTrue === "True") {
    return <Loading />;
  }
  return (
    <GridContainer>
      <Card>
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Past Rentals</h4>
          <p className={classes.cardCategoryWhite}>
            Items that you have rented in the past!
          </p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            {items.map((item, i) => {
              return (
                <Listing
                  begin_at={item.begin_at}
                  end_at={item.begin_at}
                  itemObject={item.item}
                />
              );
            })}
            {items.length === 0 ? (
              <h5>
                Looks like you have not rented anything, Try doing that by
                clicking on Discover!
              </h5>
            ) : (
              <></>
            )}
          </GridContainer>
        </CardBody>
      </Card>
    </GridContainer>
  );
}

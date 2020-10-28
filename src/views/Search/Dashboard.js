import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SectionDownload from "./SectionDownload.js";
import { Loading } from "../../../src/components";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "assets/jss/material-kit-react/views/components.js";
import CaptureDetails from "../CaptureDetails/CaptureDetails";
import { whiteColor } from "assets/jss/material-dashboard-react.js";
import TextField from "@material-ui/core/TextField";
import ArrowForwardRounded from "@material-ui/icons/ArrowForwardRounded";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, InputAdornment } from "@material-ui/core";
import Listing from "./Listing";
import Filters from "./Filters";
import downloadStyles from "assets/jss/material-kit-react/views/componentsSections/downloadStyle.js";

styles["transparent"] = { backgroundColor: "rgba(255, 255, 255, 0.5)" };

const useStyles = makeStyles(styles);
const useDownloadStyles = makeStyles(downloadStyles);

export default function Dashboard(props) {
  const { user, getAccessTokenSilently , isAuthenticated} = useAuth0();

  const history = useHistory();
  useEffect(() => {
    (async () => {
      if(isAuthenticated){
      const token = await getAccessTokenSilently();
      
    fetch(`${apiUrl}/api/profiles/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
        history.push("/capture-details");
      } else {
        console.log("SUCCESSS");
        
      }
    });
    }})(user);
  }, [user.sub]);
  

  const [items, setItems] = useState([]);
  const classes = useStyles();
  const classesDownload = useDownloadStyles();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingTrue, setLoading] = useState("False");

  const callSecureApi = (searchTerm) => {
    console.log("sending request");
    fetch(`${apiUrl}/api/items?search=${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems((previndex) => data);
      });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    callSecureApi(searchTerm);
  };

  if (isLoadingTrue === "True") {
    return <Loading />;
  }
  return (
    <div>
      <Parallax image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <TextField
                    id="search-bar"
                    placeholder="rent anything, anywhere noww"
                    style={{ color: whiteColor }}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    required
                    InputProps={{
                      classes: { input: classes.title },
                      style: { color: whiteColor },
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon
                            htmlColor="rgba(255, 255, 255, 0.5)"
                            fontSize="large"
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            type="submit"
                            aria-label="search button"
                            edge="end"
                          >
                            <ArrowForwardRounded
                              htmlColor="rgba(255, 255, 255, 0.5)"
                              fontSize="large"
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Filters />
                </form>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classesDownload.section}>
          <div className={classesDownload.container}>
            <GridContainer>
              {items.map((item, i) => {
                return (
                  <div key={i}>
                    <Listing
                      title={item.name}
                      price={item.price}
                      rating={74}
                      location={item.address.city}
                      image={item.pictures}
                    />
                  </div>
                );
              })}
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
import Mic from "@material-ui/icons/Mic";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, InputAdornment } from "@material-ui/core";
import Listing from "./Listing";
import Filters from "./Filters";
import ChatBot from "../ChatBot/ChatBot";
import downloadStyles from "assets/jss/material-kit-react/views/componentsSections/downloadStyle.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import { CustomCheckbox, Checkboxes } from "./Checkboxes";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
styles["transparent"] = { backgroundColor: "rgba(255, 255, 255, 0.5)" };
styles["buttonStyle"] = {
  marginTop: 0,
  marginBottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  color: "rgba(255,255,255,0.5)",
  fontSize: "16px",
  width:"100%"
};
styles["filterContainer"] = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",

  width: "100%",
  height: "60px",
  margin: "auto",
  marginTop: "20px",
};
styles["height100"] = {
  height: "100%",
};

const PSlider = withStyles({
  root: {
    color: '#f44336',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles(styles);
const useDownloadStyles = makeStyles(downloadStyles);
function valuetext(value) {
  return `${value}$`;
}
export default function Dashboard(props) {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState({});
  const history = useHistory();
  const [items, setItems] = useState([]);
  const classes = useStyles();
  const classesDownload = useDownloadStyles();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingTrue, setLoading] = useState("False");
  const [typeFilters, setTypeFilters] = useState({
    property: { text: "Property", value: 0 },
    service: { text: "Service", value: 0 },
    vehicles: { text: "Vehicles", value: 0 },
    items: { text: "Items", value: 0 },
  });
  const [categoryFilters, setCategoryFilters] = useState({
    apartment: { text: "Apartment", value: 0 },
    bunglow: { text: "Bunglow", value: 0 },
    land: { text: "Land", value: 0 },
    electrical: { text: "Electrical", value: 0 },
    carpenter: { text: "Carpenter", value: 0 },
    painter: { text: "Painter", value: 0 },
    plumber: { text: "Plumber", value: 0 },
    cleaners: { text: "Cleaners", value: 0 },
    packersAndMovers: { text: "Packers and Movers", value: 0 },
    car: { text: "Car", value: 0 },
    bike: { text: "Bike", value: 0 },
    motorbike: { text: "Motorbike", value: 0 },
    truck: { text: "Truck", value: 0 },
    boat: { text: "Boat", value: 0 },
    machinery: { text: "Machinery", value: 0 },
    toolkits: { text: "Toolkits", value: 0 },
    electricalAppliances: { text: "Electrical Appliances", value: 0 },
    clothings: { text: "Clothings", value: 0 },
    airBalloons: { text: "Air Balloons", value: 0 },
    other: { text: "Other", value: 0 },
  });

  const handleTypeDropdownChange = async (field, value) => {
    alert(`field: ${field}, value: ${value}`);
    let state = typeFilters;
    state[field].value = value;
    await setTypeFilters(state);
    console.log(typeFilters);
  };

  const handleCategoryDropdownChange = (field, value) => {
    alert(`field: ${field}, value: ${value}`);
    let state = categoryFilters;
    state[field].value = value;
    setCategoryFilters(state);
  };

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        fetch(`${apiUrl}/api/profiles/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              console.log("Public User");
              history.push("/capture-details");
            } else {
              return response.json();
            }
          })
          .then((data) => {
            if (data) {
              setUserId(data.id);
              console.log(data);
              if (data.is_admin) {
                localStorage.setItem("Admin", true);
              } else {
                localStorage.setItem("Admin", false);
              }
            }
          });
      }
    })(user);
  }, [user.sub]);

  const { transcript, setTerm } = useSpeechRecognition();

  useEffect(() => {
    (async () => {
      fetch(`${apiUrl}/api/recommended`, {
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
    })(searchTerm);
  }, [searchTerm]);

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
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoadingTrue === "True") {
    return <Loading />;
  }
  return (
    <div>
      <Parallax image={require("assets/img/bg42.jpg")}>
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
                    value={transcript}
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
                            aria-label="search button"
                            edge="end"
                            onClick={SpeechRecognition.startListening}
                          >
                            <Mic
                              htmlColor="rgba(255, 255, 255, 0.5)"
                              fontSize="large"
                            />
                          </IconButton>
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
                  <div className={classes.filterContainer}>
                    <GridItem xs={3}>
                      <CustomDropdown
                        dropup
                        className={classes.height100}
                        buttonText="Filter By Type"
                        hoverColor="danger"
                        dropdownList={Object.keys(typeFilters).map((key) => {
                          return (
                            <CustomCheckbox
                              label={typeFilters[key].text}
                              field={key}
                              checked={
                                typeFilters[key].value === 1 ? true : false
                              }
                              onClick={handleTypeDropdownChange}
                            />
                          );
                        })}
                        buttonProps={{
                          className:
                            classes.buttonStyle +
                            " " +
                            classes.flexGrow0 +
                            " " +
                            classes.height100,
                        }}
                        outerClassName={classes.height100}
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <CustomDropdown
                        dropup
                        buttonText="Filter By Category"
                        hoverColor="danger"
                        dropdownList={Object.keys(categoryFilters).map(
                          (key) => {
                            return (
                              <CustomCheckbox
                                label={categoryFilters[key].text}
                                field={key}
                                checked={
                                  categoryFilters[key].value === 1
                                    ? true
                                    : false
                                }
                                onClick={handleCategoryDropdownChange}
                              />
                            );
                          }
                        )}
                        buttonProps={{
                          className:
                            classes.buttonStyle +
                            " " +
                            classes.flexGrow0 +
                            " " +
                            classes.height100,
                        }}
                        outerClassName={classes.height100}
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <div className={classes.root}>
                        <Typography id="range-slider" gutterBottom>
                          Price range
                        </Typography>
                        <PSlider
                          value={value}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                          getAriaValueText={valuetext}
                        />
                      </div>
                    </GridItem>
                    <GridItem xs={3}>
                      <div className={classes.root}>
                        <Typography id="range-slider" gutterBottom>
                          Distance range
                        </Typography>
                        <PSlider
                          value={value}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                          getAriaValueText={valuetext}
                        />
                      </div>
                    </GridItem>
                  </div>
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
                  <Listing
                    title={item.name}
                    price={item.price}
                    rating={4}
                    location={item.address.city}
                    image={item.pictures}
                    userid={userId}
                    id={item.id}
                  />
                );
              })}
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

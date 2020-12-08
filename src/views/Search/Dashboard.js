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
import ChatBot from "../ChatBot/ChatBot";
import downloadStyles from "assets/jss/material-kit-react/views/componentsSections/downloadStyle.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import { CustomRadio } from "./Radios";
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

styles["fixedWidth"] = {
  width: "200px"
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
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchType, setSearchType] = useState("");
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  const types = [
    "Real Estate/Property", 
    "Staffing And Services", 
    "Vehicles", 
    "Appliances And Other Items", 
    "Clear Filter"
  ];

  const categories = [
    "Apartment",
    "Bunglow",
    "Land",
    "Electrical",
    "Carpenter",
    "Painter",
    "Plumber",
    "Cleaners",
    "Packers and Movers",
    "Car",
    "Bike",
    "Motorbike",
    "Truck",
    "Boat",
    "Machinery",
    "Toolkits",
    "Electrical Appliances",
    "Clothings",
    "Air Balloons",
    "Other",
    "Clear Filter"
  ];

  const typeDict = { 
      "Real Estate/Property": "realestate",
      "Vehicles": "vehicles",
      "Staffing And Services": "services",
      "Appliances And Other Items": "others" 
    };

  const categoryDict = { 
    "Apartment": "Apartment",
    "Bunglow": "Bunglow",
    "Land": "Land",
    "Electrical": "Electrical",
    "Carpenter": "Carpanter",
    "Painter": "Painter",
    "Plumber": "Plumber",
    "Cleaners": "Cleaners",
    "Packers And Movers": "PackersAndMovers",
    "Car": "Car",
    "Bike": "Bike",
    "Motorbike": "Motorbike",
    "Truck": "Truck",
    "Boats": "Boats",
    "Machinery": "Machinery",
    "Toolkits": "Toolkits",
    "Electrial Appliances": "ElectrialAppliances",
    "Clothings": "Clothings",
    "Air Balloon": "AirBallon",
    "Other": "Other"
  };


  const handleTypeDropdownChange = (type) => {
    if (type === "Clear Filter") {
      setSelectedType("");
      setSearchType("");
    } else {
      setSearchType(typeDict[type]);
      setSelectedType(type);
    }
  };
  
  const handleCategoryDropdownChange = (category) => {
    if (category === "Clear Filter") {
      setSelectedCategory("");
      setSearchCategory("");
    } else {
      setSearchCategory(categoryDict[category]);
      setSelectedCategory(category);
    }
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
              if (data.is_admin === true) {
                localStorage.setItem("Admin", "1");
                console.log("admin")
              } else {
                localStorage.setItem("Admin", "2");
                console.log("not admin")
              }
            }
          });
      }
    })(user);
  }, [user.sub]);

  const { transcript, setTerm } = useSpeechRecognition();

  // Set search term to transcript whenever transcript changes
  useEffect(() => {
    setSearchTerm(transcript);
  }, [transcript]);

  // For page load 
  useEffect(() => {
    if (loadingRecommended) {
      fetch(`${apiUrl}/api/recommended`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("getting recommended data: ");
          console.log(data);
          setItems((previndex) => data);
          setLoadingRecommended(false);
        });
    }
  });

  const callSecureApi = (searchTerm) => {
    let requestUrl = `${apiUrl}/api/items?search=${searchTerm}`;
    
    if (searchCategory !== "") {
      requestUrl += `&category=${searchCategory}`;
    } 
    
    if (searchType !== "") {
      requestUrl += `&type=${searchType}`;
    }

    console.log("sending request to " + requestUrl);

    fetch(requestUrl,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("response data:")
        console.log(data);
        setItems(data);
        //setItems((previndex) => data);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    callSecureApi(searchTerm);
  };
  
  const [priceRange, setPriceRange] = useState([20, 37]);
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  }

  const [distanceRange, setDistanceRange] = useState([20,37]);
  const handleDistanceRangeChange = (event, newValue) => {
    setDistanceRange(newValue);
  }

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
                    value={searchTerm}
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
                          {(SpeechRecognition.browserSupportsSpeechRecognition()) ? 
                            <IconButton
                              aria-label="search button"
                              edge="end"
                              onClick={SpeechRecognition.startListening}
                            >
                              <Mic
                                htmlColor="rgba(255, 255, 255, 0.5)"
                                fontSize="large"
                              />
                            </IconButton> : null
                          }
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
                        dropdownList={types.map((type) => {
                          return (
                            <CustomRadio
                              label={type}
                              checked={
                                (type === selectedType) ? true : false
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
                            classes.height100 +
                            " " +
                            classes.fixedWidth,
                        }}
                        outerClassName={classes.height100}
                      />
                    </GridItem>

                    <GridItem xs={3}>
                      <CustomDropdown
                        dropup
                        buttonText="Filter By Category"
                        hoverColor="danger"
                        dropdownList={categories.map((category) => {
                          return (
                            <CustomRadio
                              label={category}
                              checked={
                                (category === selectedCategory) ? true : false
                              }
                              onClick={handleCategoryDropdownChange}
                            />
                          );
                        })}
                        buttonProps={{
                          className:
                            classes.buttonStyle +
                            " " +
                            classes.flexGrow0 +
                            " " +
                            classes.height100 +
                            " " +
                            classes.fixedWidth,
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
                          value={priceRange}
                          onChange={handlePriceRangeChange}
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
                          value={distanceRange}
                          onChange={handleDistanceRangeChange}
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
                    rating={item.avg_rating}
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

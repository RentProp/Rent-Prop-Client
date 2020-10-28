import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Menu from "./Menu.js";
import Select from "react-select";
import ItemAddress from "./ItemAddress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { storage } from "./Firebase";
import { useAuth0 } from "@auth0/auth0-react";
import Input from "@material-ui/core/Input";
import { Loading } from "../../../../src/components";

const useStyles = makeStyles(modalStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ListingModal(props) {
  const history = useHistory();
  const { user, getAccessTokenSilently } = useAuth0();
  const [itemCategory, setItemCategory] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemBrand, setItemBrand] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [setItemImage, setImage] = useState([]);
  const [url, setUrl] = useState([]);
  const [progress, setProgress] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [modal, setModal] = React.useState(false);
  const [isLoadingTrue, setLoading] = useState("False");

  const classes = useStyles();
  const handleImageChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      setImage((prevState) => [...prevState, newFile]);
    }
  };

  const handleUpload = () => {
    const promises = [];
    setItemImage.forEach((file) => {
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((urlImage) => {
              setUrl((prevArray) => [...prevArray, urlImage]);
            });
        }
      );
    });
    Promise.all(promises)
      .then(() => alert("All files uploaded"))
      .catch((err) => console.log(err.code));
  };
  const callSecureApi = async (itemDetails) => {
    console.log(itemDetails)
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/api/items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: itemDetails,
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        alert("Your item has been listed and will be publicly accessible once approved by Admin");
        history.push(window.location.origin);
      }
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading("True")
    let streeAddress = localStorage.getItem("streeAddress");
    let city = localStorage.getItem("city");
    let state = localStorage.getItem("state");
    let country = localStorage.getItem("country");
    let googleMapLink = localStorage.getItem("googleMapLink");
      let address = {
      address: streeAddress,
      city,
      state,
      zip: zipCode,
      country,
      google_map_link: googleMapLink,
    };
    let itemDetails = JSON.stringify({
      category : itemCategory,
      type : itemType,
      name : itemName,
      brand : itemBrand,
      company : user.email,
      description: itemDescription,
      pictures: url,
      address,
    });
    callSecureApi(itemDetails);
  };
  if (isLoadingTrue === "True") {
    return <Loading />;
  }
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={11} sm={10} md={7} lg={7}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitleWhite}>
                      Add Items to Rent Out
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6} lg={6}>
                        <Autocomplete
                          options={top100Film}
                          getOptionLabel={(option) => option.title}
                          id="debug"
                          debug
                          onChange={(e, values) => setItemCategory(values.value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Item Type"
                              placeholder="Favorites"
                              margin="normal"
                              fullWidth
                            />
                          )}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} lg={6}>
                        <Autocomplete
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          id="debug"
                          debug
                          onChange={(e, values) => setItemType(values.value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Item Category"
                              placeholder="Favorites"
                              margin="normal"
                              fullWidth
                            />
                          )}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Name"
                          id="itemname"
                          formControlProps={{
                            fullWidth: true,
                            onChange: (e) => setItemName(e.target.value),
                          }}
                          value={itemName}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Brand/Company"
                          id="itembrand"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            required: true,
                            onChange: (e) => setItemBrand(e.target.value),
                          }}
                          value={itemBrand}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Price is Dollars $"
                          id="price"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            required: true,
                            onChange: (e) => setItemPrice(e.target.value),
                          }}
                          value={itemPrice}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Specifications"
                          id="pecifications"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            required: true,
                            onChange: (e) => setItemDescription(e.target.value),
                          }}
                          value={itemDescription}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <ItemAddress />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Postal Code"
                          id="postal-code"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            required: true,
                            onChange: (e) => setZipCode(e.target.value),
                          }}
                          value={zipCode}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={9}>
                        <Input
                        required
                          type="file"
                          inputProps={{ multiple: true }}
                          onChange={handleImageChange}
                          style={{ marginTop: "14px", width: "100%" }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <Button
                          variant="contained"
                          color="danger"
                          component="span"
                          onClick={handleUpload}
                        >
                          Upload
                        </Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        {url.map((u) => (
                          <img
                            src={u || "http://via.placeholder.com/300"}
                            alt="firebase-setItemImage"
                            style={{ height: "120px" }}
                          />
                        ))}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Button
                          type="submit"
                          value="Submit"
                          color="danger"
                          style={{ width: "100%" }}
                        >
                          Submit
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const top100Film = [
  { title: "Real State And Property", value: "realestate" },
  { title: "Vehicles (Road/Water)", value: "vehicles" },
  { title: "Staffing And Services", value: "services" },
  { title: "Applicance And Other Items", value: "others" },
];

const top100Films = [
  { title: "Apartment", value: "Apartment" },
  { title: "Bunglow", value: "Bunglow" },
  { title: "Land", value: "Land" },
  { title: "Electrical", value: "Electrical" },
  { title: "Carpanter", value: "Carpanter" },
  { title: "Painter", value: "Painter" },
  { title: "Plumber", value: "Plumber" },
  { title: "Cleaners", value: "Cleaners" },
  { title: "Packers And Movers", value: "PackersAndMovers" },
  { title: "Car", value: "Car" },
  { title: "Bike", value: "Bike" },
  { title: "Motorbike", value: "Motorbike" },
  { title: "Truck", value: "Truck" },
  { title: "Boats", value: "Boats" },
  { title: "Machinery", value: "Machinery" },
  { title: "Toolkits", value:  "Toolkits" },
  { title: "Electrial Appliances", value:  "ElectrialAppliances" },
  { title: "Clothings", value: "Clothings" },
  { title: "Air Ballon", value:  "AirBallon" },
  { title: "Other", value: "Other" },
];

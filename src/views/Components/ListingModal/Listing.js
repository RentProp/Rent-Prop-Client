import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import { AddCircle } from "@material-ui/icons";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
// import Select from "@material-ui/core/Select";
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
const useStyles = makeStyles(modalStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ListingModal() {
  const { user } = useAuth0();
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

  const [modal, setModal] = React.useState(false);

  const classes = useStyles();

  const defaultProps = {
    options: itemCategory,
    getOptionLabel: (option) => option.title,
  };
  const defaultPropsType = {
    options: itemType,
    getOptionLabel: (option) => option.title,
  };
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("hi");
    let streeAddress = localStorage.getItem("streeAddress");
    let city = localStorage.getItem("city");
    let state = localStorage.getItem("state");
    let country = localStorage.getItem("country");
    let googleMapLink = localStorage.getItem("googleMapLink");
    let auth0_id = user.sub;

    let address = {
      address: streeAddress,
      city,
      state,
      zip: zipCode,
      country,
      google_map_link: googleMapLink,
    };
    let item = {
      itemCategory,
      itemType,
      itemName,
      itemBrand,
      itemPrice,
      itemDescription,
      url,
    };
    let itemDetails = JSON.stringify({
      auth0_id,
      item,
      address,
    });
    console.log(itemDetails);
  };

  return (
    <div>
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
                        {/* <Autocomplete
                          {...defaultProps}
                          id="debug"
                          debug
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Category"
                              margin="normal"
                            />
                          )}
                        /> */}
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} lg={6}>
                        {/* <Autocomplete
                          {...defaultPropsType}
                          id="debug"
                          debug
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Type"
                              margin="normal"
                            />
                          )}
                        /> */}
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

const itemCategory = [
  { title: "Real State And Property", value: "realstate" },
  { title: "Vehicles (Road/Water)", value: "vehicles" },
  { title: "Staffing And Services", value: "services" },
  { title: "Applicance And Other Items", value: "otheritems" },
];

const itemType = [
  { value: "apartment", title: "Apartment" },
  { value: "bunglow", title: "Bunglow" },
  { value: "land", title: "Land" },
  { value: "Electrical", title: "Electrical" },
  { value: "Carpanter", title: "Carpanter" },
  { value: "Painter", title: "Painter" },
  { value: "Plumber", title: "Plumber" },
  { value: "Cleaners", title: "Cleaners" },
  { value: "Packer", title: "Packers And Movers" },
  { value: "car", title: "Car" },
  { value: "bike", title: "Bike" },
  { value: "motorbike", title: "Motorbike" },
  { value: "truck", title: "Truck" },
  { value: "boats", title: "Boats" },
  { value: "Machinery", title: "Machinery" },
  { value: "Toolkits", title: "Toolkits" },
  { value: "Electrial", title: "Electrial Appliances" },
  { value: "Clothings", title: "Clothings" },
  { value: "Ballon", title: "Air Ballon" },
  { value: "Other", title: "Other" },
];

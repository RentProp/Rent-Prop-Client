import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useHistory } from "react-router-dom";

// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/Visibility";
import { cardTitle } from "assets/jss/material-kit-react.js";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import Input from "@material-ui/core/Input";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Loading } from "../../../src/components";
import { storage } from "../Components/ListingModal/Firebase";
import { useAuth0 } from "@auth0/auth0-react";
import Tooltip from "@material-ui/core/Tooltip";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function Cards(props) {
  const history = useHistory();
  const { user, getAccessTokenSilently } = useAuth0();
  const [itemCategory, setItemCategory] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemBrand, setItemBrand] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [setItemImage, setImage] = useState([]);
  const classes = useStyles();
  const [url, setUrl] = useState([]);
  const [progress, setProgress] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [modal, setModal] = React.useState(false);
  const [isLoadingTrue, setLoading] = useState("False");

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
      .then(() => console.log("All files uploaded"))
      .catch((err) => console.log(err.code));
  };
  const callSecureApi = async (itemDetails) => {
    console.log(itemDetails);
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
        alert(
          "Your item has been updated and will be publicly accessible once approved by Admin"
        );
        history.push(window.location.origin);
      }
    });
  };
  const itemPage = (id) => {
    let path = `/item/${id}`;
    history.push(path);
  };
  const handleDeleteItem = async (id) => {
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/api/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        alert("Your item has been deleted");
        history.push(window.location.origin);
      }
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading("True");
    handleUpload();
    let streetAddress = {
      address,
      city,
      state,
      zip: zipCode,
      country,
    };
    let itemDetails = JSON.stringify({
      category: itemCategory,
      type: itemType,
      name: itemName,
      price: itemPrice,
      brand: itemBrand,
      company: user.email,
      description: itemDescription,
      pictures: url,
      streetAddress,
    });
    alert(itemDetails);
    // callSecureApi(itemDetails);
  };
  if (isLoadingTrue === "True") {
    return <Loading />;
  }

  return (
    <Card style={{ margin: "5px", width: "20%" }}>
      <img
        style={{ height: "180px", width: "100%", display: "block" }}
        className={classes.imgCardTop}
        src={props.image}
        alt="Card-img-cap"
      />
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={10} md={10}>
            <h4 className={classes.cardTitle}>{props.title}</h4>
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <Tooltip title="View as Public">
              <IconButton
                color="danger"
                aria-label="open drawer"
                onClick={() => itemPage(props.id)}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          </GridItem>
        </GridContainer>
        <p>${props.price}</p>
        <Button color="danger" onClick={() => setModal(true)}>
          Edit Item
        </Button>
        <Button color="danger" onClick={() => handleDeleteItem(props.id)}>
          Remove Item
        </Button>
      </CardBody>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Edit this item?</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6} lg={6}>
                <Input
                  value={props.title}
                  onChange={(e) => setItemName(e.target.value)}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>

              <GridItem xs={12} sm={6} md={6} lg={6}>
                <Input
                  value={props.price}
                  onChange={(e) => setItemPrice(e.target.value)}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6} lg={6}>
                <Input
                  defaultValue={props.category}
                  onChange={(e) => setItemCategory(e.target.value)}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>

              <GridItem xs={12} sm={6} md={6} lg={6}>
                <Input
                  defaultValue={props.type}
                  onChange={(e) => setItemType(e.target.value)}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6} lg={6}>
                <Input
                  defaultValue={props.brand}
                  onChange={(e) => setItemBrand(e.target.value)}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6} lg={6}>
                <Input
                  defaultValue={props.location}
                  onChange={(e) => setAddress(e.target.value)}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6} lg={6}>
                <Input
                  defaultValue={props.city}
                  onChange={(e) => setCity(e.target.value)}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6} lg={6}>
                <Input
                  defaultValue={props.state}
                  onChange={(e) => setState(e.target.value)}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={6} md={6} lg={6}>
                <Input
                  onChange={(e) => setCountry(e.target.value)}
                  defaultValue={props.country}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6} lg={6}>
                <Input
                  defaultValue={props.zip}
                  onChange={(e) => setZipCode(e.target.value)}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <Input
                  onChange={(e) => setItemDescription(e.target.value)}
                  defaultValue={props.description}
                  inputProps={{ "aria-label": "description" }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <Input
                  required
                  type="file"
                  inputProps={{ multiple: true }}
                  onChange={handleImageChange}
                  style={{ marginTop: "14px", width: "100%" }}
                />
              </GridItem>
            </GridContainer>

            <img
              style={{ height: "180px", display: "block", marginTop: "10px" }}
              src={props.pictures}
              alt="Card-img-cap"
            />
            <Button
              type="submit"
              style={{ width: "100%" }}
              color="danger"
              value="Submit"
            >
              Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

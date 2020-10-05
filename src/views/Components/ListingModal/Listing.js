import React, { useReducer } from "react";
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
import ImageUpload from "./ImageUpload";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
const useStyles = makeStyles(modalStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ListingModal() {
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

  return (
    <div>
      <div>
        <Button
          className={classes.navLink}
          onClick={() => setModal(true)}
          color="transparent"
        >
          <AddCircle className={classes.icons} />
          Add Item Listing
        </Button>
      </div>
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
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
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
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} lg={6}>
                      <Autocomplete
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
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Brand/Company"
                        id="itembrand"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Price"
                        id="price"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Specifications"
                        id="pecifications"
                        formControlProps={{
                          fullWidth: true,
                        }}
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
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <ImageUpload style={{ width: "100%" }} />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={() => setModal(false)} color="danger">
            Never Mind
          </Button>
          <Button onClick={() => setModal(false)} color="success">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}





const itemCategory = [
  { title: 'Real State And Property', value: 'realstate' },
  { title: 'Vehicles (Road/Water)', value: 'vehicles'},
  { title: 'Staffing And Services',value: 'services' },
  { title: 'Applicance And Other Items', value: 'otheritems' },
]

const itemType = [
  { value: 'apartment', title: 'Apartment' },
  { value: 'bunglow', title: 'Bunglow' },
  { value: 'land', title: 'Land' },
  { value: 'Electrical', title: 'Electrical' },
  { value: 'Carpanter', title: 'Carpanter' },
  { value: 'Painter', title: 'Painter' },
  { value: 'Plumber', title: 'Plumber' },
  { value: 'Cleaners', title: 'Cleaners' },
  { value: 'Packer', title: 'Packers And Movers' },
  { value: 'car', title: 'Car' },
  { value: 'bike', title: 'Bike' },
  { value: 'motorbike', title: 'Motorbike' },
  { value: 'truck', title: 'Truck' },
  { value: 'boats', title: 'Boats' },
  { value: 'Machinery', title: 'Machinery' },
  { value: 'Toolkits', title: 'Toolkits' },
  { value: 'Electrial', title: 'Electrial Appliances' },
  { value: 'Clothings', title: 'Clothings' },
  { value: 'Ballon', title: 'Air Ballon' },
  { value: 'Other', title: 'Other' }
]
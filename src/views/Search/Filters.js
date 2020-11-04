import React from 'react';

import {CustomCheckbox, Checkboxes} from './Checkboxes';
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CustomInput from 'components/CustomInput/CustomInput';
import { whiteColor } from "assets/jss/material-dashboard-react.js";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";


let styles = {
  buttonStyle: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "rgba(255,255,255,0.5)",
  },
  flexGrow0: {
    flexGrow: 0,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",

    width: "75%",
    margin: "auto",
    marginTop: "20px"
  },
};

const useStyles = makeStyles(styles);


export default function Filters(props) {
  const classes = useStyles();
  const typeArray = ["Property", "Service", "Vehicles", "Items"];
  const categoryArray = ["Apartment", "Bunglow", "Land", "Electrical", "Carpenter", "Painter", "Plumber", "Cleaners", "Packers and Mover", "Car", "Bike", "Motorbike", "Truck", "Boat", "Machinery", "Toolkits", "Electrical Appliances", "Clothings", "Air Balloons", "Other"]; 
  return (
    <div className={classes.filterContainer}>
      <CustomDropdown
        buttonText="Filter By Type"
        hoverColor="danger"
        dropdownList={typeArray.map((item) => {
          return <CustomCheckbox label={item} />;
        })}
        buttonProps={{
          className: classes.buttonStyle + " " + classes.flexGrow0,
        }}
      />
      <CustomDropdown
        buttonText="Filter By Category"
        hoverColor="danger"
        dropdownList={categoryArray.map((item) => {
          return <CustomCheckbox label={item} />;
        })}
        buttonProps={{
          className: classes.buttonStyle + " " + classes.flexGrow0,
        }}
      />
      <TextField
        id="min price"
        placeholder="Minimum Price"
        style={{ color: "#979097" }}
        variant="outlined"
        InputProps={{
          style: { color: "rgba(255,255,255,0.5)", fontSize: "1rem" },
        }}
      />

      <TextField
        id="max price"
        placeholder="Maximum Price"
        style={{ color: "#979097" }}
        variant="outlined"
        InputProps={{
          style: { color: "rgba(255,255,255,0.5)", fontSize: "1rem" },
        }}
      />
    </div>
  );
}
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
  height100: {
    height: "100%"
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",

    width: "75%",
    height: "60px",
    margin: "auto",
    marginTop: "20px"
  },
};

const useStyles = makeStyles(styles);


export default function Filters(props) {
  const classes = useStyles();
  const typeObj = {property: "Property", service: "Service", vehicles: "Vehicles", items: "Items"};
  const categoryObj = {apartment: "Apartment", bunglow: "Bunglow", land: "Land", electrical: "Electrical", carpenter: "Carpenter", painter: "Painter", plumber: "Plumber", cleaners: "Cleaners", packersAndMovers: "Packers and Mover", car: "Car", bike: "Bike", motorbike: "Motorbike", truck: "Truck", boat: "Boat", machinery: "Machinery", toolkits: "Toolkits", electricalAppliances: "Electrical Appliances", clothings: "Clothings", airBalloons: "Air Balloons", other: "Other"}; 
  
  return (
    <div className={classes.filterContainer}>
      <CustomDropdown
        dropup
        className={classes.height100}
        buttonText="Filter By Type"
        hoverColor="danger"
        dropdownList={Object.keys(typeObj).map((key) => {
          return (
            <CustomCheckbox
              label={typeObj[key]}
              field={key}
              checked={(props.typeFiltersState[key] === 1) ? true : false}
              onClick={props.handleTypeDropdownChange}
            />
          );
        })}
        buttonProps={{
          className: classes.buttonStyle + " " + classes.flexGrow0,
        }}
      />

      <CustomDropdown
        dropup
        buttonText="Filter By Category"
        hoverColor="danger"
        dropdownList={Object.keys(categoryObj).map((key) => {
          return (
            <CustomCheckbox
              label={categoryObj[key]}
              field={key}
              checked={(props.categoryFiltersState[key] === 1) ? true : false}
              onClick={props.handleCategoryDropdownChange}
            />
          );
        })}
        buttonProps={{
          className: classes.buttonStyle + " " + classes.flexGrow0
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
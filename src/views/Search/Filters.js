import React from 'react';

import Checkboxes from './Checkboxes';
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import CustomInput from 'components/CustomInput/CustomInput';
import { whiteColor } from "assets/jss/material-dashboard-react.js";
import TextField from "@material-ui/core/TextField";


export default function Filters(props) {
    return (
      <GridContainer>
        <GridItem md={3}>
          <Checkboxes
            label="Product Type"
            items={["Property", "Service", "Vehicles", "Items"]}
          />
        </GridItem>
        <GridItem md={3}>
          <Checkboxes
            label="Product Category"
            items={[
              "Electrical",
              "Carpenter",
              "Painter",
              "Plumber",
              "Cleaners",
              "Packers and Movers",
            ]}
          />
        </GridItem>
        <GridItem md={3}>
          <Checkboxes
            label="State"
            items={[
              "Electrical",
              "Carpenter",
              "Painter",
              "Plumber",
              "Cleaners",
              "Packers and Movers",
            ]}
          />
        </GridItem>
        <GridItem md={3}>
          <h4 style={{color:"rgba(255, 255, 255, 0.5)", marginBottom: '4px'}}>Price Range</h4>
          <div style={{ width: "50%" }}>
            <TextField
              id="min price"
              placeholder="min"
              style={{ color: whiteColor }}
              variant="outlined"
              fullWidth
              InputProps={{
                style: { color: whiteColor },
              }}
            />
          </div>
          <p style={{color:"rgba(255, 255, 255, 0.5)"}}>to</p>
          <div style={{ width: "50%" }}>
            <TextField
              id="max price"
              placeholder="max"
              style={{ color: whiteColor }}
              variant="outlined"
              fullWidth
              InputProps={{
                style: { color: whiteColor },
              }}
            />
          </div>
        </GridItem>
      </GridContainer>
    );
}
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
            items={["Property", "Service", "Vehicles", "Items"]}
          />
        </GridItem>
        <GridItem md={3}>
          <Checkboxes
            items={[
              "Electrician",
              "Carpenter",
              "Painter",
              "Cleaners",
            ]}
          />
        </GridItem>
        <GridItem md={3}>
          <Checkboxes
            label=""
            items={[
              "Car",
              "Boat",
              "Electronic Appliances",
              "Apartment",
            ]}
          />
        </GridItem>
        <GridItem md={3}>
          <div style={{ width: "50%" }}>
            <TextField
              id="min price"
              placeholder="Minimum Price"
              style={{ color: "#979097",margin: '23px' }}
              variant="outlined"
              fullWidth
              InputProps={{
                style: { color: "#979097" },
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <TextField
              id="max price"
              placeholder="Maximum Price"
              style={{ color: "#979097",margin: '23px' }}
              variant="outlined"
              fullWidth
              InputProps={{
                style: { color: "#979097" },
              }}
            />
          </div>
        </GridItem>
      </GridContainer>
    );
}
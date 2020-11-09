import React from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import "./Filters.css";

import styles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

styles["checkboxesContainer"] = {display: 'flex', flexDirection: 'column'};
styles["checkboxesLabel"] = {
    color: "#979097",
    cursor: "pointer",
    display: "inline-flex",
    transition: "0.3s ease all",
    fontWeight: 400,
    lineHeight: 1.428571429,
    paddingLeft: 0,
    letterSpacing: 'unset'
  };

const useStyles = makeStyles(styles);

export function CustomCheckbox(props) {
    const classes = useStyles();
    return (
      <div
        className={ classes.checkboxAndRadio }
        style={{ color: "rgba(255, 255, 255, 0.5)", margin: "0px" }}
        onClick={() => {props.onClick(props.field, (props.checked) ? 0 : 1)}}
      >
        <FormControlLabel
          control={
            <Checkbox
              tabIndex={-1}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{ checked: classes.checked }}
            />
          }
          checked={props.checked}
          classes={{ label: classes.checkboxesLabel }}
          label={props.label}
        />
      </div>
    );
}

export function Checkboxes(props) {
    const classes = useStyles();

    return (
        <div>
            <h4 style={{color:"#cecece", marginBottom: '0px'}}>{props.label}</h4>
            {props.items.map((item) => <CustomCheckbox label={item} />)}
        </div>
    );
}
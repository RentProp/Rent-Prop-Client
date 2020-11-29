import React from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import { FiberManualRecord } from "@material-ui/icons";

// Styles
import styles from "assets/jss/material-kit-react/customCheckboxRadioSwitch";



styles["RadiosContainer"] = {display: 'flex', flexDirection: 'column'};
styles["RadiosLabel"] = {
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

export function CustomRadio(props) {
    const classes = useStyles();
    return (
      <div
        className={ classes.checkboxAndRadio }
        style={{ color: "rgba(255, 255, 255, 0.5)", margin: "0px" }}
        onClick={() => {props.onClick(props.label)}}
      >
        <FormControlLabel
          control={
            <Radio
              tabIndex={-1}
              checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
              icon={<FiberManualRecord className={classes.radioUnchecked} />}
              classes={{ checked: classes.checked }}
            />
          }
          checked={props.checked}
          classes={{ label: classes.RadiosLabel }}
          label={props.label}
        />
      </div>
    );
}

export function Radios(props) {
    const classes = useStyles();

    return (
        <div>
            <h4 style={{color:"#cecece", marginBottom: '0px'}}>{props.label}</h4>
            {props.items.map((item) => <CustomRadio label={item} />)}
        </div>
    );
}
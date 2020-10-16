import React from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";

import styles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

styles["checkboxesContainer"] = {display: 'flex', flexDirection: 'column'};

const useStyles = makeStyles(styles);

function CustomCheckbox(props) {
    const classes = useStyles();

    return (
      <div
        className={classes.checkboxAndRadio}
        style={{ color: "rgba(255, 255, 255, 0.5)", margin: "0px" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              tabIndex={-1}
              //onClick={() => handleToggle(21)}
              //inputProps={{style: {color:"rgba(255, 255, 255, 0.5)"}}}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{ checked: classes.checked }}
            />
          }
          classes={{ label: classes.label }}
          label={props.label}
        />
      </div>
    );
}

export default function Checkboxes(props) {
    const classes = useStyles();

    return (
        <div>
            <h4 style={{color:"rgba(255, 255, 255, 0.5)", marginBottom: '0px'}}>{props.label}</h4>
            {props.items.map((item) => <CustomCheckbox label={item} />)}
        </div>
    );
}
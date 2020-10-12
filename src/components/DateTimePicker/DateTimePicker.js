import React from 'react';

import Datetime from 'react-datetime';

import { makeStyles } from '@material-ui/core/Styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import "react-datetime/css/react-datetime.css";

const styles = {
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex",
  },
};

const useStyles = makeStyles(styles);

export default function DateTimePicker(props) {
  const classes = useStyles();
  return (
    <div>
      <InputLabel className={classes.label}>{props.label}</InputLabel>
      <br />
      <FormControl fullWidth>
        <Datetime inputProps={{ placeholder: props.placeholder }} />
      </FormControl>
    </div>
  );
}

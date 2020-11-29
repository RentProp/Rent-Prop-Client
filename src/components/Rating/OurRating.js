import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';

export const StyledRating = withStyles({
  iconFilled: {
    color: "#f44336",
  },
  iconHover: {
    color: "#f44336",
  },
})(Rating);

export default function OurRating(props) {
    return (
        <StyledRating
            name={props.name}
            value={props.rating}
            percision={0.5}
            size="large"
        />
    );
}
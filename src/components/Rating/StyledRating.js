import React from 'react';

import Rating from '@material-ui/lab/Rating';



export default function StyledRating(props) {
    return (
        <Rating
            name={props.name}
            value={5*(props.rating)/100}
            percision={0.1}
            size="large"
        />
    );
}
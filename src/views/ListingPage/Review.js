import React from 'react';

import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import Quote from 'components/Typography/Quote';
import OurRating from 'components/Rating/OurRating';
import Danger from "components/Typography/Danger";

export default function Review(props) {


    return (
      <Card>
        <CardBody>
          <p><i>{props.text}</i></p>
          <OurRating rating={props.rating} />
        </CardBody>
      </Card>
    );

}
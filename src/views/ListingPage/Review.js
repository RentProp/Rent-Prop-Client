import React from 'react';

import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import Quote from 'components/Typography/Quote';
import StyledRating from 'components/Rating/StyledRating';
import Danger from "components/Typography/Danger";

export default function Review(props) {


    return (
      <Card>
        <CardBody>
          <Danger>
            <h4 style={{ marginBottom: 0, fontWeight: 'bold' }}>
              {props.title}
            </h4>
          </Danger>
          <StyledRating rating={props.rating} />
          <Quote text={props.text} author={props.author} />
        </CardBody>
      </Card>
    );

}
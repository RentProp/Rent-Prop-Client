import React, {useState, useEffect} from "react";
import { withStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";

import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js"
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Rating from "@material-ui/lab/Rating";

import Review from "./Review.js";

const StyledRating = withStyles({
  iconFilled: {
    color: "#f44336",
  },
  iconHover: {
    color: "#f44336",
  },
})(Rating);


export default function ReviewSection(props) {
  const { getAccessTokenSilently } = useAuth0();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;
  const submitReview = async (e) => {
  
    let formData = JSON.stringify({item: props.id, review: review, rating: rating});

    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/api/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((res) => res.json()) 
      .then((res) => {
        console.log(res);
      }) 
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (isLoading) {
      fetch(`${apiUrl}/api/reviews`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setReviews(res)
          setIsLoading(false);
        })
        .catch((e) => console.log(e));
    }
  })

  return (
    <>
      <Card>
        <CardBody>
          <form onSubmit={(e) => submitReview(e)}>
            <GridContainer>
              <GridItem sm={12}>
                <CustomInput
                  labelText="Got something to say? Write a review here..."
                  id="review-input"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    required: true,
                    onChange: (e) => setReview(e.target.value),
                  }}
                  value={review}
                />
              </GridItem>
              <GridItem sm={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                <StyledRating
                  name="review-rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
                <Button type="submit" value="Submit" color="success" style={{flexGrow: 0}}>
                  Submit
                </Button>
              </GridItem>
            </GridContainer>
          </form>
        </CardBody>
      </Card>

      { 
        reviews.map((item) => {
          return (item.item.toString() === props.id.toString()) ? <Review text={item.review} rating={item.rating} /> : <></>;
        })
      }
      
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Avatar from "@material-ui/core/Avatar";
import { useAuth0 } from "@auth0/auth0-react";
import Badge from "@material-ui/core/Badge";
import AssignmentIcon from "@material-ui/icons/AddCircleRounded";
import Address from "./Address";
import { Loading } from "../../../src/components";
export default function LoginPage(props) {
  const history = useHistory();
  const { user } = useAuth0();
  const { email, picture, username, user_id } = user;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [message, setMessage] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const [isLoadingTrue, setLoading] = useState("False");

  // useEffect(() => {
  //   (async () => {
  //     const token = await getAccessTokenSilently();
  //   fetch(`${apiUrl}/api/profiles/me`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     }
  //   }).then((response) => {
  //     if (!response.ok) {
  //       console.log("SOMETHING WENT WRONG");
  //     } else {
  //       console.log("SUCCESSS");
  //       history.push(window.location.origin);
  //     }
  //   });
  //   })(firstName);
  // }, [user.sub]);


  const callSecureApi = async (userDetails) => {
    
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/api/profiles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: userDetails,
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        console.log("SUCCESSS");
        history.push(window.location.origin);
      }
    });
  };
  const handleSubmit = (evt) => {
    setLoading("True")
    evt.preventDefault();
    let streeAddress = localStorage.getItem("streeAddress");
    let city = localStorage.getItem("city");
    let state = localStorage.getItem("state");
    let country = localStorage.getItem("country");
    let googleMapLink = localStorage.getItem("googleMapLink");
    let auth0_id = user.sub;
    let username = user.nickname;
    let address = {
      address: streeAddress,
      city,
      state,
      zip: zipCode,
      country,
      google_map_link: googleMapLink,
    };

    let userDetails = JSON.stringify({
      auth0_id,
      username,
      email,
      first_name: firstName,
      last_name: lastName,
      contact_number: contactNumber,
      address,
    });
    console.log(userDetails);
    callSecureApi(userDetails);
  };
  
  if (isLoadingTrue === "True") {
    return <Loading />;
  }

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={11} sm={10} md={7} lg={7}>
        <h2>Create Profile</h2>
          <Card>
            <CardHeader
              color="danger"
              style={{ justifyContent: "center", display: "flex" }}
            >
              Create Profile
            </CardHeader>
            <CardBody>
              <GridContainer
                direction="column"
                alignItems="center"
                justify="space-evenly"
              >
                <GridItem style={{ justifyContent: "center", display: "flex" }}>
                  <Badge
                    overlap="circle"
                    style={{ color: "#f44336" }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={<AssignmentIcon />}
                  >
                    <Avatar
                      alt={email}
                      srcSet={picture}
                      style={{ height: "75px", width: "75px" }}
                    />
                  </Badge>
                </GridItem>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="First Name"
                        id="float"
                        formControlProps={{ fullWidth: true }}
                        labelProps={{ required: true }}
                        inputProps={{
                          required: true,
                          onChange: (e) => setFirstName(e.target.value),
                        }}
                        value={firstName}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Last Name"
                        id="float"
                        formControlProps={{ fullWidth: true }}
                        labelProps={{ required: true }}
                        inputProps={{
                          required: true,
                          onChange: (e) => setLastName(e.target.value),
                        }}
                        value={lastName}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Contact Number"
                        id="float"
                        formControlProps={{ fullWidth: true }}
                        labelProps={{ required: true }}
                        inputProps={{
                          required: true,
                          onChange: (e) => setContactNumber(e.target.value),
                        }}
                        value={contactNumber}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText={"Email " + email}
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          disabled: true,
                        }}
                        defaultValue={"Email " + email}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Address />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Zip Code"
                        id="float"
                        formControlProps={{ fullWidth: true }}
                        labelProps={{ required: true }}
                        inputProps={{
                          required: true,
                          onChange: (e) => setZipCode(e.target.value),
                        }}
                        value={zipCode}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Button
                        type="submit"
                        value="Submit"
                        color="danger"
                        style={{ width: "100%" }}
                      >
                        Submit
                      </Button>
                    </GridItem>
                  </GridContainer>
                </form>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

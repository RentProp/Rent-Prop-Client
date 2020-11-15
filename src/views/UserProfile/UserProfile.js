import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Input from "@material-ui/core/Input";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "../../../src/components";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const history = useHistory();

  const classes = useStyles();
  const [data, setData] = useState({});
  const { user, getAccessTokenSilently } = useAuth0();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddrs] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [url, setUrl] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isLoadingTrue, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        let result = await fetch(`${apiUrl}/api/profiles/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const res = await result.json();
        localStorage.setItem("userid", res.id);
        await setFirstName((prevFirstName) => res.first_name);
        await setLastName((prevlastName) => res.last_name);
        await setContactNumber((prevContactNumber) => res.contact_number);
        await setZipCode((prevZip) => res.address.zip);
        await setStreetAddrs((prevAddr) => res.address.address);
        await setCity((prevCity) => res.address.city);
        await setCountry((prevCountry) => res.address.country);
        await setState((prevState) => res.address.state);
        await setUrl((prevState) => res.address.google_map_link);
      } catch {}
    })(data);
  }, [user.sub]);

  const callSecureApi = async (userDetails) => {
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/api/profiles/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: userDetails,
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        alert("Profile Updated");
        history.push(window.location.origin + "/account/user");
      }
    });
  };
  const handleSubmit = (evt) => {
    setLoading("True");
    evt.preventDefault();
    let auth0_id = user.sub;
    let username = user.nickname;
    let address = {
      address: streetAddress,
      city,
      state,
      zip: zipCode,
      country,
      google_map_link: url,
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

  if (isLoadingTrue) {
    return <Loading />;
  }

  const { email, picture, name, nickname } = user;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <form
              onSubmit={handleSubmit}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Type the fields you wnat to update
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={"Email  " + email}
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                      labelProps={{
                        style: {
                          fontStyle: "italic",
                        },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={"Username  " + nickname}
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                      labelProps={{
                        style: {
                          fontStyle: "italic",
                        },
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`${firstName}`}
                      defaultValue={streetAddress}
                      id="firstName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => setFirstName(e.target.value),
                      }}
                      value={firstName}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`${lastName}`}
                      defaultValue={streetAddress}
                      id="lastName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => setLastName(e.target.value),
                      }}
                      value={lastName}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`${contactNumber}`}
                      defaultValue={contactNumber}
                      id="contactNumber"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => setContactNumber(e.target.value),
                      }}
                      value={contactNumber}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`${streetAddress}`}
                      defaultValue={streetAddress}
                      id="address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => setStreetAddrs(e.target.value),
                      }}
                      value={streetAddress}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={`${city}`}
                      defaultValue={city}
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => setCity(e.target.value),
                      }}
                      value={city}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={`${country}`}
                      defaultValue={country}
                      id="country"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => setCountry(e.target.value),
                      }}
                      value={country}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={`${zipCode}`}
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => setZipCode(e.target.value),
                      }}
                      value={zipCode}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>

              <CardFooter>
                <Button color="danger" type="submit">
                  Update Profile
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <img src={picture} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{email}</h6>
              <h4 className={classes.cardTitle}>{name}</h4>
              <p className={classes.description}>Items Rented : 0</p>
              <p className={classes.description}>Items Listed : 0</p>
              <p className={classes.description}>Rating: 5/5</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

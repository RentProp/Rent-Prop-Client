import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Input from '@material-ui/core/Input';
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
import TextField from '@material-ui/core/TextField';
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
  const classes = useStyles();
  const [data, setData] = useState({})
  const { user, getAccessTokenSilently } = useAuth0();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddrs, setStreetAddrs] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const setProps = (userDetails) => {
    console.log(userDetails)
    setLastName(userDetails.last_name)
    setContactNumber(userDetails.contact_number)
    setZipCode(userDetails.address.zip)
    setStreetAddrs(userDetails.address.address)
    setCity(userDetails.address.city)
    setCountry(userDetails.address.country)
    setState(userDetails.address.state)
    console.log(firstName)

  }

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
                  })
            const res = await result.json();
            console.log(res.first_name)
            let fn = res.first_name
            await setFirstName(prevFirstName => fn);
            console.log(firstName)
        } catch {}
    })(data)
}, [user.sub])
  
  

  const { email, picture, name, nickname } = user;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
            <form className={classes.root} noValidate autoComplete="off">
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
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                labelText={"First Name  " + localStorage.getItem("firstName")}
                  defaultValue= {lastName}
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Input
                  defaultValue={"Last Name  " +localStorage.getItem("lastName")}
                  
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                  labelText={"Street Address  " +localStorage.getItem("streetAddrs")}
                  defaultValue= {streetAddrs}
                    id="address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  labelText={"City  " +localStorage.getItem("city")}
                  defaultValue= {city}
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  labelText={"Country  " +localStorage.getItem("country")}
                    
                    defaultValue= {country}
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                  labelText={"Zip Code   " +localStorage.getItem("zipCode")}
                  
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              </form>
            </CardBody>
            
            <CardFooter>
              <Button color="danger">Update Profile</Button>
            </CardFooter>
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

import React from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import useCustomForm from "./useCustomForm";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { useForm } from "react-hook-form";
import image from "assets/img/bg7.jpg";
import Avatar from "@material-ui/core/Avatar";
import { useAuth0 } from "@auth0/auth0-react";
import Badge from "@material-ui/core/Badge";
import AssignmentIcon from '@material-ui/icons/AddCircleRounded';
const useStyles = makeStyles(styles);
function onSubmitForm(formData) {
  alert("Hi your phone number is: " + formData.firstName);
}

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);
export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const { user } = useAuth0();
  // const { email, picture } = user;
  
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={11} sm={10} md={5} lg={4}>
          <Card>
            <CardHeader color="danger" style={{ justifyContent: "center", display: "flex" }}>Create Profile</CardHeader>
            <CardBody>
              <GridContainer
                direction="column"
                alignItems="center"
                justify="space-evenly"
              >
                <GridItem style={{ justifyContent: "center", display: "flex" }}>
                  <Badge
                    overlap="circle"
                    style = {{color: "#f44336"}}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <AssignmentIcon  />
                    }
                    
                  >
                    {/* <Avatar alt={email} srcSet={picture} style={{height: "75px", width : "75px"}}/> */}
                  </Badge>
                </GridItem>
                <GridItem>
                  <CustomInput
                    labelText="First Name"
                    id="float"
                    formControlProps={{ fullWidth: true }}
                    labelProps={{ required: true }}
                    inputProps={{
                      required: true,
                    }}
                    ref={register}
                    name="firstName"
                  />
                </GridItem>
                <GridItem>
                  <CustomInput
                    labelText="Last Name"
                    id="float"
                    formControlProps={{ fullWidth: true }}
                    labelProps={{ required: true }}
                    inputProps={{
                      required: true,
                    }}
                    ref={register}
                    name="lastName"
                  />
                </GridItem>
                <GridItem>
                  <CustomInput
                    labelText="Address"
                    id="float"
                    formControlProps={{ fullWidth: true }}
                    labelProps={{ required: true }}
                    inputProps={{
                      required: true,
                    }}
                    ref={register}
                    name="address"
                  />
                </GridItem>
                <GridItem>
                  <CustomInput
                    labelText="Country"
                    id="float"
                    formControlProps={{ fullWidth: true }}
                    labelProps={{ required: true }}
                    inputProps={{
                      required: true,
                    }}
                    ref={register}
                    name="country"
                  />
                </GridItem>
                <GridItem>
                  <CustomInput
                    labelText="Zipcode"
                    id="float"
                    formControlProps={{ fullWidth: true }}
                    labelProps={{ required: true }}
                    inputProps={{
                      required: true,
                    }}
                    ref={register}
                    name="zipCode"
                  />
                </GridItem>
                <GridItem>
                  <CustomInput
                    labelText="Contact Number"
                    id="float"
                    formControlProps={{ fullWidth: true }}
                    labelProps={{ required: true }}
                    inputProps={{required: true}}
                    ref={register}
                    name="contactNumber"
                  />
                </GridItem>
                <GridItem></GridItem>
                <GridItem>
                  <Button
                    type="submit"
                    value="Submit"
                    color="danger"
                    style={{ width: "100%" }}
                    onClick={handleSubmit(onSubmitForm)}
                  >
                    Submit
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

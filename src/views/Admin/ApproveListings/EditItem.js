import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useHistory } from "react-router-dom";

// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/Visibility";
import { cardTitle } from "assets/jss/material-kit-react.js";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import Input from "@material-ui/core/Input";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Loading } from "../../../../src/components";
import { storage } from "../../Components/ListingModal/Firebase";
import { useAuth0 } from "@auth0/auth0-react";
import Tooltip from "@material-ui/core/Tooltip";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function Cards(props) {
  const history = useHistory();
  const { user, getAccessTokenSilently } = useAuth0();
  const classes = useStyles();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [modal, setModal] = React.useState(false);
  const [isLoadingTrue, setLoading] = useState("False");

  const handleApproveItem = async (id) => {
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/api/items/${id}/approve`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        alert("The item has been approved and will now be publicly accessible");
      }
    });
  };

  const handleRejectItem = async (id) => {
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/api/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        alert("The item has been rejected");
      }
    });
  };

  if (isLoadingTrue === "True") {
    return <Loading />;
  }

  return (
    <Card style={{ margin: "5px", width: "20%" }}>
      <img
        style={{
          height: "180px",
          width: "100%",
          display: "block",
          objectFit: "contain",
        }}
        className={classes.imgCardTop}
        src={props.image}
        alt="Card-img-cap"
      />
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={10} md={10}>
            <h4 className={classes.cardTitle}>{props.title}</h4>
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <Tooltip title="View Item Details">
              <IconButton
                color="danger"
                aria-label="open drawer"
                onClick={() => setModal(true)}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          </GridItem>
        </GridContainer>
        <p>${props.price}</p>
        <GridContainer>
          <GridItem xs={6}>
            <Button
              color="success"
              style={{ width: "100%" }}
              onClick={() => handleApproveItem(props.id)}
            >
              Approve Item
            </Button>
          </GridItem>
          <GridItem xs={6}>
            <Button
              color="danger"
              style={{ width: "100%" }}
              onClick={() => handleRejectItem(props.id)}
            >
              Remove Item
            </Button>
          </GridItem>
        </GridContainer>
      </CardBody>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <GridContainer>
            <GridItem xs={10}>
              <h4 className={classes.modalTitle}>Item Details</h4>
            </GridItem>
            <GridItem xs={2}>
              <IconButton
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => setModal(false)}
              >
                <Close className={classes.modalClose} />
              </IconButton>
            </GridItem>
          </GridContainer>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <Table
            tableHeaderColor="danger"
            tableHead={["Property", "Value"]}
            tableData={[
              ["Name", `${props.title}`],
              ["Price", `${props.price}`],
              ["Category", `${props.category}`],
              ["Type", `${props.type}`],
              ["Brand", `${props.brand}`],
              [
                "Street Address",
                `${props.location}` +
                  ", " +
                  `${props.city}` +
                  ", " +
                  `${props.state}` +
                  ", " +
                  `${props.country}` +
                  ", " +
                  `${props.zip}`,
              ],
              ["Description", `${props.description}`],
            ]}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

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
import { Loading } from "../../../components";
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
  const { user, getAccessTokenSilently } = useAuth0();
  const classes = useStyles();
  const [items, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isLoadingTrue, setLoading] = useState("False");
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        let userid = localStorage.getItem("userid");
        let result = await fetch(`${apiUrl}/api/items/unapproved`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const res = await result.json();
        console.log(res);
        await setData((previndex) => res);
        setLoading(false);
      } catch {}
    })(items);
  }, [user.sub]);

  if (isLoadingTrue === "True") {
    return <Loading />;
  }

  return (
    <GridContainer>
      <Card>
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Approve Items</h4>
          <p className={classes.cardCategoryWhite}>
            Items that were requested by Owners to be listed on RentNoww. These
            items are currently not publicly available.
          </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="danger"
            tableHead={["Name, Email, Phone Number, Address"]}
            tableData={[
              ["Name" ], 
              ["Price" ],
              ["Category" ],
              ["Type"],
              ["Brand"],
              ["Street Address"],
              ["Description"],
            ]}
          />
        </CardBody>
      </Card>
    </GridContainer>
  );
}

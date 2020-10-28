import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import { cardTitle } from "assets/jss/material-kit-react.js";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import Input from "@material-ui/core/Input";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function Cards(props) {
  const [modal, setModal] = React.useState(false);
  const classes = useStyles();
  return (
    <Card style={{ margin: "5px", width:"20%" }}>
      <img
        style={{ height: "180px", width: "100%", display: "block" }}
        className={classes.imgCardTop}
        src={props.image}
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>{props.title}</h4>
        <p>{props.price}</p>
        <Button color="danger" onClick={() => setModal(true)}>Edit Item</Button>
        <Button color="danger">Remove Item</Button>
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
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>Edit this item?</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <form className={classes.root} noValidate autoComplete="off">
  <Input defaultValue={props.title} inputProps={{ 'aria-label': 'description' }} />
  <Input defaultValue={props.price} inputProps={{ 'aria-label': 'description' }} />
  <Input defaultValue={props.category} inputProps={{ 'aria-label': 'description' }} />
  <Input defaultValue={props.type} inputProps={{ 'aria-label': 'description' }} />
  <Input defaultValue={props.location} inputProps={{ 'aria-label': 'description' }} />
  <Input defaultValue={props.city} inputProps={{ 'aria-label': 'description' }} />
  <Input defaultValue={props.state} inputProps={{ 'aria-label': 'description' }} />
  <Input defaultValue={props.country} inputProps={{ 'aria-label': 'description' }} />
  <Input defaultValue={props.zip} inputProps={{ 'aria-label': 'description' }} />
  <Input defaultValue={props.description} inputProps={{ 'aria-label': 'description' }} />
  <img
            style={{ height: "180px",  display: "block" }}
            
            src={props.pictures}
            alt="Card-img-cap"
          />
</form>
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button 
          style = {{width:"100%"}} 
          onClick={() => setModal(false)}
          >
          Never Mind
          </Button>
          <Button style = {{width:"100%"}} onClick={() => setModal(false)} color="success">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

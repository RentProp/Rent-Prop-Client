import React from "react";
/* global google */

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );

    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    this.setState({
      name: addressObject.name,
      streeAddress: `${address[0].long_name} ${address[1].long_name}`,
      city: address[2].long_name,
      country: address[6].long_name,
      state: address[5].long_name,
      googleMapLink: addressObject.url,
    });
    localStorage.setItem("streeAddress", this.state.streeAddress);
    localStorage.setItem("city", this.state.city);
    localStorage.setItem("state", this.state.state);
    localStorage.setItem("country", this.state.country);
    localStorage.setItem("googleMapLink", this.state.googleMapLink);
  }
  initialState() {
    return {
      name: "",
      streeAddress: "",
      city: "",
      state: "",
      count: "",
      zipCode: "",
      googleMapLink: "",
    };
  }

  render() {
    return (
      <input
        ref={this.autocompleteInput}
        id="autocomplete"
        placeholder="Enter your address *"
        type="text"
        style={{
          width: "100%",
          border: "0px",
          marginTop: "25px",
          marginBottom: "25px",
          fontSize: "14px",
          color: "#495057"
        }}
      ></input>
    );
  }
}
export default Address;

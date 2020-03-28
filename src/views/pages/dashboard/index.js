import React, { Component } from "react";
import StayReservations from "../stay_reservations";
import FoodReservations from "../food_reservations";

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <StayReservations isDashboard="true" />
        <FoodReservations isDashboard="true" />
      </React.Fragment>
    );
  }
}

export default Dashboard;

import React, { Component } from "react";
import StayReservations from "../stay_reservations";
import FoodReservations from "../food_reservations";

import { Col, Row } from "reactstrap";

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <StayReservations isDashboard="true" />
          </Col>
          <Col>
            <FoodReservations isDashboard="true" />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Dashboard;

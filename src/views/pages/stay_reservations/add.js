import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col,
  Row
} from "reactstrap";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

import FormWrapper from "../../../components/common/form";
import { loader } from "../../../actions/loaderAction";
import { addNewProfile } from "../../../services/profileService";

class Add extends FormWrapper {
  state = {
    data: {
      price: null,
      reservation_type: "company",
      contact_name: null,
      contact_number: null,
      contact_email: null,
      guests_count: 1,
      reserved_from: null,
      reserved_to: null,
      tent_id: null,
      stay_type_id: null,
      activities_ids: null,

      company_id: null,
      notes: null,
      reservation_number: null
    },
    isChanged: false,

    errors: {}
  };

  schema = {
    price: Joi.label("Price"),
    reservation_type: Joi.label("Reservation Type"),
    meal_type_id: Joi.label("Meal Type"),
    food_ids: Joi.label("Food"),
    contact_name: Joi.label("Contact Name"),
    contact_number: Joi.label("Contact Number"),
    contact_email: Joi.label("Contact Email"),
    guests_count: Joi.label("Guests Count"),
    company_id: Joi.label("Company Name"),
    notes: Joi.label("Notes"),
    reservation_number: Joi.label("Reservation Number"),

    reserved_from: Joi.date()
      .required()
      .label("Reservation From"),
    reserved_to: Joi.date()
      .required()
      .label("Reservation To"),
    tent_id: Joi.label("Tent"),
    stay_type_id: Joi.label("Tent Type"),
    activities_ids: Joi.label("Activity")
  };

  doSubmit = async () => {
    let { data, errors: errs } = this.state;
    const oldData = { ...data };
    const { url } = this.props;

    try {
      await this.props.dispatch(loader(true));

      if (oldData.food_ids) {
        const food_ids = oldData.food_ids.map(food => food.value);
        oldData.food_ids = food_ids;
      }

      if (oldData.activities) {
        const activities = oldData.activities.map(activity => activity.value);
        oldData.activities = activities;
      }

      const data = await addNewProfile(oldData);
      this.props.history.push(`${url}/${data.id}`);
    } catch (err) {
      if (err.response) {
        const errors = { ...errs };
        const details = err.response.data.details;

        let key;
        for (key in details) {
          if (details.hasOwnProperty(key)) {
            errors[key] = details[key];
          }
        }

        this.setState({ errors });
        if (err.response.data.msg) toast.error(err.response.data.msg);
      }
    } finally {
      await this.props.dispatch(loader(false));
    }
  };

  render() {
    const {
      showModal,
      onToggle,
      company_options,
      reservation_type_options,
      activities_options,
      tent_options,
      stay_types_options
    } = this.props;

    const { data } = this.state;

    let company_information = "";
    if (data.reservation_type === "company") {
      company_information = (
        <React.Fragment>
          <Row>
            <Col>
              {this.renderSelect(
                "company_id",
                "Company",
                company_options,
                "choose company"
              )}
            </Col>
            <Col>
              {this.renderInput("reservation_number", "Reservation Number")}
            </Col>
          </Row>
        </React.Fragment>
      );
    }
    return (
      <Modal
        isOpen={showModal}
        toggle={onToggle}
        className={this.props.className}
      >
        <ModalHeader toggle={onToggle}>Add profile</ModalHeader>
        <form onSubmit={this.handleSubmit}>
          <ModalBody>
            <div className="p-3">
              <Row>
                <Col>
                  {this.renderSelect(
                    "reservation_type",
                    "Reservation Type",
                    reservation_type_options
                  )}
                </Col>

                <Col>
                  {this.renderDatePicker("reserved_from", "Reservation From")}
                </Col>

                <Col>
                  {this.renderDatePicker("reserved_to", "Reservation To")}
                </Col>
              </Row>
              {company_information}
              <Row>
                <Col>{this.renderInput("contact_name", "Contact Name")}</Col>
                <Col>
                  {this.renderInput("contact_number", "Contact Number")}
                </Col>
                <Col>{this.renderInput("contact_email", "Contact Email")}</Col>
              </Row>
              <Row>
                <Col>
                  {this.renderSelect(
                    "tent_id",
                    "Tent",
                    tent_options,
                    "Choose Tent"
                  )}
                </Col>
                <Col>
                  {this.renderSelect(
                    "stay_type_id",
                    "Stay Type",
                    stay_types_options,
                    "Choose Stay Type"
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  {this.renderInput(
                    "guests_count",
                    "Guests Count",
                    "",
                    "",
                    "",
                    "number"
                  )}
                </Col>
                <Col>
                  {this.renderInput("price", "Price", "", "", "", "number")}
                </Col>
              </Row>
              <Row>
                <Col>
                  {this.renderMultiSelect(
                    "activities_ids",
                    "Activities",
                    activities_options,
                    "Choose Activity"
                  )}
                </Col>
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
            {this.renderButton("Save")}
            <Button color="secondary" onClick={onToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ loaderReducer, companyReducer }) => ({
  loaderReducer,
  companyReducer
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Add));

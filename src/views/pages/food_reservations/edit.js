import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Button
} from "reactstrap";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import Joi from "joi-browser";

import {
  getProfile,
  getProfiles,
  updateProfile
} from "../../../services/profileService";

import FormWrapper from "../../../components/common/form";
import { loader } from "../../../actions/loaderAction";
import UnSavedChanges from "../../../components/common/unSavedChanges";

class Edit extends FormWrapper {
  state = {
    data: {
      id: null,
      price: null,
      reservation_type: "company",
      meal_type_id: null,
      food_ids: null,
      contact_name: null,
      contact_number: null,
      contact_email: null,
      guests_count: null,
      reservation_date: null,

      status: null,
      company_id: null,
      notes: null,
      reservation_number: null,

      created_at: null,
      updated_at: null
    },
    meal_types_options: null,
    food_options: null,
    company_options: null,
    isChanged: false,

    errors: {}
  };

  url = "/dashboard/food_reservations";
  reset = {};

  schema = {
    food: Joi.label("Delete this when razz delete it"),

    id: Joi.label("Document Number"),
    price: Joi.label("Price"),
    reservation_type: Joi.label("Reservation Type"),
    meal_type_id: Joi.label("Meal Type"),
    food_ids: Joi.label("Food"),
    contact_name: Joi.label("Contact Name"),
    contact_number: Joi.label("Contact Number"),
    contact_email: Joi.label("Contact Email"),
    guests_count: Joi.label("Guests Count"),
    reservation_date: Joi.date()
      .required()
      .label("Reservation Date"),
    company_id: Joi.label("Company Name"),
    reservation_number: Joi.label("Reservation Number"),
    status: Joi.label("Reservation Status"),
    notes: Joi.label("Notes"),

    created_at: Joi.label("created_at"),
    updated_at: Joi.label("updated_at")
  };

  reservation_type_options = [
    {
      id: "company",
      name: "Company"
    },
    {
      id: "individual",
      name: "Individual"
    }
  ];

  status_options = [
    {
      id: "booked",
      name: "Booked"
    },
    {
      id: "cancel",
      name: "Cancel"
    },
    {
      id: "confirm",
      name: "Confirm"
    }
  ];

  async componentDidMount() {
    let { errors: errs } = this.state;
    try {
      this.initResetVariable();

      await this.props.dispatch(loader(true));
      const id = window.location.pathname.split("/")[3];

      const data = await getProfile(id);
      if (data.company) {
        data.company.id = data.company.id.toString();
      } else {
        data.company_id = data.company;
      }
      delete data.company;

      const { results: meal_types_options } = await getProfiles("meal_types");
      const { results: food_options } = await getProfiles("food");
      const { results: company_options } = await getProfiles("companies");

      this.reset.data = data;

      this.setState({
        data,
        meal_types_options,
        food_options,
        company_options
      });
    } catch (err) {
      if (err.response) {
        const errors = { ...errs };
        // errors.username = err.response.data.msg;
        this.setState({ errors });
        if (err.response.data.msg) toast.error(err.response.data.msg);
      }
    } finally {
      await this.props.dispatch(loader(false));
    }
  }

  initResetVariable = () => {
    const { data } = this.state;
    this.reset = { ...data };
  };

  ExitEditMode = () => {
    this.props.history.push(`${this.url}`);
  };

  resetHandler = () => {
    const data = this.reset.data;
    this.setState({ data, isChanged: false, errors: {} });
  };

  doSubmit = async () => {
    const { data: value, errors: errs } = this.state;
    try {
      await this.props.dispatch(loader(true));
      const data = await updateProfile(value);
      this.reset.data = data;
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
      data,
      meal_types_options,
      food_options,
      company_options,
      isChanged
    } = this.state;
    if (!data.id) return null;

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
              {this.renderInput(
                "reservation_number",
                "Company Reservation Number"
              )}
            </Col>
          </Row>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <UnSavedChanges isChanged={isChanged} />
        <Row>
          <Col>
            <h2>{data.name}</h2>
          </Col>
          <Col className="text-right">
            <Button
              color="secondary"
              onClick={this.ExitEditMode}
              className="ml-2"
            >
              Exit edit mode
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>Information</strong>
              </CardHeader>
              <form onSubmit={this.handleSubmit}>
                <CardBody>
                  <Row>
                    <Col md="2">
                      {this.renderInput(
                        "id",
                        "Document Number",
                        "",
                        "",
                        "",
                        "text",
                        false,
                        true
                      )}
                    </Col>
                    <Col>
                      {this.renderSelect(
                        "reservation_type",
                        "Reservation Type",
                        this.reservation_type_options
                      )}
                    </Col>
                    <Col>
                      {this.renderSelect(
                        "status",
                        "Reservation Status",
                        this.status_options
                      )}
                    </Col>
                    <Col>
                      {this.renderDatePicker(
                        "reservation_date",
                        "Reservation Date"
                      )}
                    </Col>
                  </Row>
                  {company_information}
                  <Row>
                    <Col>
                      {this.renderInput("contact_name", "Contact Name")}
                    </Col>
                    <Col>
                      {this.renderInput("contact_number", "Contact Number")}
                    </Col>
                    <Col>
                      {this.renderInput("contact_email", "Contact Email")}
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
                      {this.renderSelect(
                        "meal_type_id",
                        "Meal Type",
                        meal_types_options,
                        "Choose Meal"
                      )}
                    </Col>
                    <Col>
                      {this.renderMultiSelect(
                        "food_ids",
                        "Food",
                        food_options,
                        "Choose Food"
                      )}
                    </Col>
                  </Row>
                  <Row md="6">
                    <Col>
                      {this.renderTextArea(
                        "notes",
                        "Client Notes",
                        "Any special request ..."
                      )}
                    </Col>
                  </Row>
                </CardBody>

                <CardFooter>
                  <Row>
                    <Col>
                      <Button
                        color="danger"
                        onClick={this.resetHandler}
                        className="ml-2"
                      >
                        Reset
                      </Button>
                    </Col>
                    <Col className="text-right">
                      {this.renderButton("Save", !isChanged)}
                    </Col>
                  </Row>
                </CardFooter>
              </form>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ loaderReducer }) => ({
  loaderReducer
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

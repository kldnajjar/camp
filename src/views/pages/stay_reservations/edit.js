import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Button,
} from "reactstrap";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import Joi from "joi-browser";

import {
  getProfile,
  getProfiles,
  updateProfile,
} from "../../../services/profileService";

import FormWrapper from "../../../components/common/form";
import { loader } from "../../../actions/loaderAction";
import UnSavedChanges from "../../../components/common/unSavedChanges";

class Edit extends FormWrapper {
  state = {
    data: {
      id: null,
      tent_id: null,
      price: null,
      reservation_type: "company",
      contact_name: null,
      contact_number: null,
      contact_email: null,
      guests_count: null,
      reservation_date: null,

      status: null,
      company: null,
      notes: null,
      reservation_number: null,
      activities_ids: null,

      created_at: null,
      updated_at: null,
    },
    company_options: [],
    tent_options: [],
    tent_types_options: [],
    stay_types_options: [],
    activities_options: [],

    isChanged: false,

    errors: {},
  };

  url = "/dashboard/stay_reservations";
  reset = {};

  schema = {
    id: Joi.label("Document Number"),
    price: Joi.label("Price"),
    reservation_type: Joi.label("Reservation Type"),
    contact_name: Joi.label("Contact Name"),
    contact_number: Joi.label("Contact Number"),
    contact_email: Joi.label("Contact Email"),
    guests_count: Joi.label("Guests Count"),
    company: Joi.label("Company Name"),
    reservation_number: Joi.label("Reservation Number"),
    status: Joi.label("Reservation Status"),
    notes: Joi.label("Notes"),

    created_at: Joi.label("created_at"),
    updated_at: Joi.label("updated_at"),

    reserved_from: Joi.date().required().label("Reservation From"),
    reserved_to: Joi.date().required().label("Reservation To"),
    tent_id: Joi.label("Tent"),
    stay_type_id: Joi.label("Tent Type"),
    activities_ids: Joi.label("Activity"),
  };

  reservation_type_options = [
    {
      id: "company",
      name: "Company",
    },
    {
      id: "individual",
      name: "Individual",
    },
  ];

  status_options = [
    {
      id: "booked",
      name: "Booked",
    },
    {
      id: "cancelled",
      name: "Cancelled",
    },
    {
      id: "confirmed",
      name: "Confirmed",
    },
  ];

  async componentDidMount() {
    let { errors: errs } = this.state;
    try {
      this.initResetVariable();

      await this.props.dispatch(loader(true));
      const id = window.location.pathname.split("/")[3];

      const data = await getProfile(id);

      if (data.company) {
        data.company = data.company.id.toString();
      }

      const { results: company_options } = await getProfiles("companies");
      const { results: tent_types_options } = await getProfiles("tent_types");
      const { results: tent_options } = await getProfiles("tents");
      const { results: stay_types_options } = await getProfiles("stay_types");
      const { results: activities_options } = await getProfiles("activities");

      this.reset.data = data;

      this.setState({
        data,
        company_options,
        tent_types_options,
        tent_options,
        stay_types_options,
        activities_options,
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
      company_options,
      activities_options,
      tent_options,
      stay_types_options,
      isChanged,
    } = this.state;
    if (!data.id) return null;

    let company_information = "";
    if (data.reservation_type === "company") {
      company_information = (
        <React.Fragment>
          <Row>
            <Col>
              {this.renderSelect(
                "company",
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
                        "reserved_from",
                        "Reservation From"
                      )}
                    </Col>

                    <Col>
                      {this.renderDatePicker("reserved_to", "Reservation To")}
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
  loaderReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

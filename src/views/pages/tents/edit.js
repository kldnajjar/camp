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
  getCompanyById,
  updateCompany
} from "../../../services/admin/companiesService";

import FormWrapper from "../../../components/common/form";
import { loader } from "../../../actions/loaderAction";
import Addressable from "../../../components/common/admin/addressable";
import Phoneable from "../../../components/common/admin/phoneable";
import Imageable from "../../../components/common/admin/imageable";
import Features from "./features";
import UnSavedChanges from "../../../components/common/unSavedChanges";

class Edit extends FormWrapper {
  state = {
    data: {
      id: null,
      configuration_name: "",
      name: "",
      email: "",
      url: "",
      joined_date: "",
      status: "",
      subscription_type: ""
    },
    isChanged: false,
    errors: {}
  };

  reset = {};

  status_option = [
    {
      id: "enabled",
      name: "Enabled"
    },
    {
      id: "disabled",
      name: "Disabled"
    }
  ];

  subscription_options = [
    {
      id: "monthly",
      name: "Monthly"
    },
    { id: "yearly", name: "Yearly" }
  ];

  schema = {
    name: Joi.string()
      .required()
      .label("Company name"),
    configuration_name: Joi.string()
      .required()
      .label("Configuration name"),
    url: Joi.label("URL"),
    email: Joi.label("Email"),
    id: Joi.label("ID"),
    joined_date: Joi.label("Joined date"),
    status: Joi.label("Status"),
    subscription_type: Joi.label("Subscription type")
  };

  async componentDidMount() {
    let { errors: errs } = this.state;
    try {
      this.initResetVariable();

      await this.props.dispatch(loader(true));
      const id = window.location.pathname.split("/")[3];

      const { company: data } = await getCompanyById(id);
      this.reset.data = data;

      this.setState({ data });
    } catch (err) {
      if (err.response) {
        const errors = { ...errs };
        // errors.username = err.response.data.error.message;
        this.setState({ errors });
        toast.error(err.response.data.error.message);
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
    this.props.history.push(`/dashboard/companies/${this.state.data.id}`);
  };

  resetHandler = () => {
    const data = this.reset.data;
    this.setState({ data, isChanged: false, errors: {} });
  };

  doSubmit = async () => {
    const { data, errors: errs } = this.state;
    try {
      await this.props.dispatch(loader(true));
      const { company } = await updateCompany(data);
      this.reset.data = company;
    } catch (err) {
      if (err.response) {
        const errors = { ...errs };
        const details = err.response.data.error.details;

        let key;
        for (key in details) {
          if (details.hasOwnProperty(key)) {
            errors[key] = details[key];
          }
        }

        this.setState({ errors });
        toast.error(err.response.data.error.message);
      }
    } finally {
      await this.props.dispatch(loader(false));
    }
  };

  render() {
    const { data, isChanged } = this.state;
    if (!data.id) return null;

    const extraAddressOption = [{ name: "addressable_type", value: "Company" }];
    const extraPhoneOption = [{ name: "phoneable_type", value: "Company" }];
    const extraImagesOption = [
      { name: "imageable_type", value: "Company" },
      { name: "image_type", value: "logo" }
    ];

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
                    <Col>
                      {this.renderInput(
                        "name",
                        "Name",
                        "",
                        "",
                        "Enter Company name",
                        "text",
                        true
                      )}
                    </Col>
                    <Col>
                      {this.renderInput(
                        "configuration_name",
                        "Configuration name",
                        "",
                        "",
                        "Enter Configuration name",
                        "text"
                      )}
                    </Col>
                    <Col>
                      {this.renderInput(
                        "email",
                        "Email",
                        "",
                        "",
                        "Enter company email address",
                        "text"
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {this.renderInput(
                        "url",
                        "URL",
                        "",
                        "",
                        "Enter your company url",
                        "text"
                      )}
                    </Col>
                    <Col>
                      {this.renderDatePicker("joined_date", "Joined date")}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderSelect(
                        "status",
                        "Status",
                        this.status_option
                      )}
                    </Col>
                    <Col>
                      {this.renderSelect(
                        "subscription_type",
                        "Subscription Type",
                        this.subscription_options
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

        <Imageable options={extraImagesOption} />

        <Addressable options={extraAddressOption} />

        <Phoneable options={extraPhoneOption} />

        <Features />
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

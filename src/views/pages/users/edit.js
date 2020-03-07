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

import { getProfile, updateProfile } from "../../../services/profileService";

import FormWrapper from "../../../components/common/form";
import { loader } from "../../../actions/loaderAction";
import UnSavedChanges from "../../../components/common/unSavedChanges";

class Edit extends FormWrapper {
  state = {
    data: {
      id: null,
      name: null,
      phone_number: null,
      role: null,
      email: null,
      is_active: true
    },
    isChanged: false,
    errors: {}
  };

  url = "/dashboard/users";
  reset = {};

  role_option = [
    { id: "business_owner", name: "Admin" },
    { id: "empoloyee", name: "Empoloyee" }
  ];

  active_option = [
    {
      id: "true",
      name: "Yes"
    },
    {
      id: "false",
      name: "No"
    }
  ];

  schema = {
    id: Joi.label("ID"),
    name: Joi.string()
      .required()
      .label("Name"),
    phone_number: Joi.label("Number"),
    role: Joi.label("Role"),
    email: Joi.label("Email"),
    is_active: Joi.label("Active User")
  };

  async componentDidMount() {
    let { errors: errs } = this.state;
    try {
      this.initResetVariable();

      await this.props.dispatch(loader(true));
      const id = window.location.pathname.split("/")[3];

      const data = await getProfile(id);
      this.reset.data = data;

      this.setState({ data });
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
    const { data, isChanged } = this.state;
    if (!data.id) return null;

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
                        "fa fa-info-circle",
                        "User name",
                        "text",
                        true
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderSelect(
                        "role",
                        "Role",
                        this.role_option,
                        "Select Role"
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderInput(
                        "phone_number",
                        "Phone Number",
                        "",
                        "fa fa-info-circle",
                        "Phone Number",
                        "number"
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderInput(
                        "email",
                        "Email",
                        "",
                        "fa fa-info-circle",
                        "User Email",
                        "text"
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderSelect(
                        "is_active",
                        "Active User",
                        this.active_option,
                        "Is User Active"
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

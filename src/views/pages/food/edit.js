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
      name: null,
      id: null,
      archived: null,
      disabled: false
    },
    isChanged: false,
    errors: {}
  };

  url = "/dashboard/food";
  reset = {};

  disabled_option = [
    {
      id: "true",
      name: "Disabled"
    },
    {
      id: "false",
      name: "Enabled"
    }
  ];

  schema = {
    id: Joi.label("ID"),
    name: Joi.string()
      .required()
      .label("Name"),
    disabled: Joi.label("Disabled"),
    archived: Joi.label("Archived")
  };

  async componentDidMount() {
    let { errors: errs } = this.state;
    try {
      this.initResetVariable();

      await this.props.dispatch(loader(true));
      const id = window.location.pathname.split("/")[3];

      const { data } = await getProfile(id);
      this.reset.data = data;

      this.setState({ data });
    } catch (err) {
      if (err.response) {
        const errors = { ...errs };
        // errors.username = err.response.data.error.detail;
        this.setState({ errors });
        toast.error(err.response.data.error.detail);
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
        const details = err.response.data.error.details;

        let key;
        for (key in details) {
          if (details.hasOwnProperty(key)) {
            errors[key] = details[key];
          }
        }

        this.setState({ errors });
        toast.error(err.response.data.error.detail);
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
                        "Food name",
                        "text",
                        true
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderSelect(
                        "disabled",
                        "Disabled",
                        this.disabled_option
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

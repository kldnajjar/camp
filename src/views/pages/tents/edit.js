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
      archived: null,
      capacity: null,
      name: null,
      tent_type: null
    },
    tent_types: [],
    isChanged: false,
    errors: {}
  };

  url = "/dashboard/tents";
  reset = {};

  schema = {
    id: Joi.label("ID"),
    name: Joi.string()
      .required()
      .label("Tent Name"),
    capacity: Joi.label("Tents Number"),
    tent_type: Joi.string()
      .required()
      .label("Tent Type"),
    archived: Joi.label("Archived")
  };

  async componentDidMount() {
    let { errors: errs } = this.state;
    try {
      this.initResetVariable();

      await this.props.dispatch(loader(true));
      const id = window.location.pathname.split("/")[3];

      const { data } = await getProfile(id);
      const tent_types = await getProfiles("tent_types");

      this.reset.data = data;

      this.setState({ data, tent_types });
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
    const { data, tent_types, isChanged } = this.state;
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
                        "Tent name",
                        "text",
                        true
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderSelect(
                        "tent_type",
                        "Tent Type",
                        tent_types,
                        "Select Tent Type"
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderInput(
                        "capacity",
                        "Total Nuumber",
                        "",
                        "fa fa-info-circle",
                        "Tents Count",
                        "number"
                      )}
                    </Col>{" "}
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

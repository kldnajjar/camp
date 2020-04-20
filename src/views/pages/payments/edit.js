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

import { getProfile, updateProfile } from "../../../services/profileService";

import FormWrapper from "../../../components/common/form";
import { loader } from "../../../actions/loaderAction";
import UnSavedChanges from "../../../components/common/unSavedChanges";

class Edit extends FormWrapper {
  state = {
    data: {
      id: null,
      amount: null,
      payment_type: null,
      expenses: null,
      date: null,
      note: null,
      created_at: null,
      updated_at: null,
    },
    isChanged: false,
    errors: {},
  };

  url = "/dashboard/payments";
  reset = {};

  payment_type_option = [
    { id: "cash", name: "Cash" },
    { id: "credit", name: "Credit" },
  ];

  schema = {
    id: Joi.label("ID"),
    amount: Joi.number().required().label("Number"),
    payment_type: Joi.label("Payment Type"),
    expenses: Joi.label("Expenses"),
    date: Joi.label("Date"),
    note: Joi.label("Note"),
    created_at: Joi.label("Created At"),
    updated_at: Joi.label("Update At"),
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
                        "amount",
                        "Amount",
                        "",
                        "",
                        "Enter a value",
                        "number",
                        true
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderSelect(
                        "payment_type",
                        "Payment Type",
                        this.payment_type_option,
                        "Select Type"
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderInput(
                        "expenses",
                        "Expenses",
                        "",
                        "",
                        "Enter a value",
                        "number"
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>{this.renderDatePicker("date", "Payment Date")}</Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.renderTextArea(
                        "note",
                        "Payment Notes",
                        "Description ..."
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

import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col,
  Row,
} from "reactstrap";
import Joi from "joi-browser";
import moment from "moment";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

import FormWrapper from "../../../components/common/form";
import { loader } from "../../../actions/loaderAction";
import { addNewProfile } from "../../../services/profileService";

class Add extends FormWrapper {
  state = {
    data: {
      amount: null,
      payment_type: "cash",
      expenses: null,
      date: moment().format(),
      note: null,
    },
    isChanged: false,

    errors: {},
  };

  payment_type_option = [
    { id: "cash", name: "Cash" },
    { id: "credit", name: "Credit" },
  ];

  schema = {
    amount: Joi.number().required().label("Number"),
    payment_type: Joi.label("Payment Type"),
    expenses: Joi.label("Expenses"),
    date: Joi.label("Date"),
    note: Joi.label("Note"),
  };

  doSubmit = async () => {
    const { data: oldData, errors: errs } = this.state;
    const { url } = this.props;

    try {
      await this.props.dispatch(loader(true));
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
    const { showModal, onToggle } = this.props;
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
  companyReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Add));

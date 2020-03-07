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
      first_name: null,
      last_name: "Camp",
      phone_number: null,
      role: null,
      email: null,
      is_active: true
    },
    isChanged: false,

    errors: {}
  };

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
    first_name: Joi.string()
      .required()
      .label("Name"),
    last_name: Joi.label("Name"),
    phone_number: Joi.label("Number"),
    role: Joi.label("Role"),
    email: Joi.label("Email"),
    is_active: Joi.label("Active User")
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
                    "first_name",
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

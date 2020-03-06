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
      name: null,
      capacity: null
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Tent Name"),
    capacity: Joi.label("Tents Number")
  };

  doSubmit = async () => {
    const { data: oldData, errors: errs } = this.state;

    try {
      await this.props.dispatch(loader(true));
      const { data } = await addNewProfile(oldData);
      this.props.history.push(`/dashboard/tents/${data.id}`);
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
                  {this.renderInput(
                    "capacity",
                    "Total Nuumber",
                    "",
                    "fa fa-info-circle",
                    "Tents Count",
                    "number"
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

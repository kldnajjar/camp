import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col,
  Row
} from "reactstrap";

class Delete extends Component {
  render() {
    const { showModal, onToggle, info, onDelete } = this.props;
    return (
      <Modal
        isOpen={showModal}
        toggle={onToggle}
        className={"modal-danger " + this.props.className}
      >
        <ModalHeader toggle={this.toggleDanger}>
          Delete Confirmation
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              Are you sure you want to delete this profile {info.name} ?
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => onDelete(info.id)}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={onToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default Delete;

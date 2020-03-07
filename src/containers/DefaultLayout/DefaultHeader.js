import React, { Component } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  UncontrolledDropdown
} from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";

import auth from "../../services/authService";
import { loader } from "../../actions/loaderAction";

import logo from "../../assets/img/logo.png";
import avatar from "../../assets/img/avatars/profile.png";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  handleLogout = async () => {
    try {
      await this.props.dispatch(loader(true));
      window.location = `/login`;
      auth.removeLocalStorage();
    } catch (err) {
      if (err.response) toast.error(err.response.data.error.detail);
    } finally {
      this.props.dispatch(loader(false));
    }
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand full={{ src: logo, height: 50, alt: "Logo" }} />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={avatar} className="img-avatar" alt="Profile" />
            </DropdownToggle>
            <DropdownMenu right style={{ height: "400px", right: 0 }}>
              <DropdownItem onClick={this.handleLogout}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = ({ loaderReducer }) => ({
  loaderReducer
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DefaultHeader));

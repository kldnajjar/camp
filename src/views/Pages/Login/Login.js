import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Row
} from "reactstrap";

import FormWrapper from "../../../components/common/form";
import auth from "../../../services/authService";
import { loader } from "../../../actions/loaderAction";
import strings from "./localization";

class Login extends FormWrapper {
  state = {
    data: {
      email: null,
      password: null
    },
    lang: "ar",
    displayedLang: "en",
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  toggleLanguage = () => {
    let { displayedLang, lang } = this.state;

    if (displayedLang === "en") {
      displayedLang = "ar";
      lang = "en";
    } else if (displayedLang === "ar") {
      displayedLang = "en";
      lang = "ar";
    }

    strings.setLanguage(displayedLang);
    this.setState({ displayedLang, lang });
  };

  handleLogin = () => {
    // console.log("khaled", this);
    // axios
    //   .post("https://reqres.in/api/login", {
    //     email: "eve.holt@reqres.in",
    //     password: "cityslicka"
    //   })
    //   .then(response => {
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     if (error.response) toast.error(error.response.data.error);
    //     else toast.error(error.message);
    //   });
  };

  doSubmit = async () => {
    const { data, errors: errs } = this.state;

    try {
      await this.props.dispatch(loader(true));
      await auth.login(data);
      window.location = `/dashboard`;
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
  };

  render() {
    const { lang } = this.state;

    return (
      <div className="app flex-row align-items-center">
        <ToastContainer
          position="top-right"
          autoClose={false}
          style={{ zIndex: 1999 }}
        />
        <div className="localization-container">
          <Button size="sm" color="ghost-success" onClick={this.toggleLanguage}>
            {lang}
          </Button>
        </div>

        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Row>
                      <form
                        className="mt-4 full-width"
                        onSubmit={this.handleSubmit}
                      >
                        {this.renderInput(
                          "email",
                          "Email",
                          "",
                          "",
                          "Enter email",
                          "text",
                          true
                        )}

                        {this.renderInput(
                          "password",
                          "Password",
                          "",
                          "",
                          "Enter password",
                          "password"
                        )}

                        <div className="pull-right">
                          {this.renderButton("Login")}
                        </div>
                      </form>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ loaderReducer }) => ({
  loaderReducer
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

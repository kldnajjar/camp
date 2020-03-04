import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import FormWrapper from "../../../components/common/form";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { loader } from "../../../actions/loaderAction";
import auth from "../../../services/authService";

const containerStyle = { zIndex: 1999 };

class Login extends FormWrapper {
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

  render() {
    return (
      <div className="app flex-row align-items-center">
        <ToastContainer
          position="top-right"
          autoClose={false}
          style={containerStyle}
        />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={this.handleLogin}
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
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

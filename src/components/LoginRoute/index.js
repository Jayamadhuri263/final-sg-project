import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect, Link } from "react-router-dom";

// import Context
import Context from "../../context/Context";
import "./index.css";
// import styled components
import {
  LoginPage,
  LoginForm,
  LogoContainer,
  InputFieldContainer,
  InputFieldLabel,
  InputField,
  CheckBoxContainer,
  CheckBox,
  CheckBoxLabel,
  LoginButton,
  ErrorMessage,
  Logo
} from "./styledComponents";

class LoginRoute extends Component {
  state = { username: "", password: "", showPassword: false, errorMessage: "" };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const apiUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password })
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok) {
      this.onSuccessfulLogin(data);
    } else {
      this.onInvalidLogin(data);
    }
  };

  onSuccessfulLogin = (data) => {
    const jwtToken = data.jwt_token;
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    const { history } = this.props;
    history.replace("/");
  };

  onInvalidLogin = (data) => this.setState({ errorMessage: data.error_msg });

  render() {
    if (Cookies.get("jwt_token") !== undefined) {
      return <Redirect to="/" />;
    }
    const { username, password, showPassword, errorMessage } = this.state;
    return (
      <Context.Consumer>
        {(value) => {
          const { isDarkTheme } = value;
          return (
            <>
              <div className="login-header">
                {/* <Link to="/login">
                    <button type="button" className="login-route-login-button">Login</button>
                  </Link> */}
                <Link to="/register">
                  <button type="button" className="login-route-login-button">
                    Register
                  </button>
                </Link>
              </div>

              <LoginPage dark={isDarkTheme}>
                <LoginForm dark={isDarkTheme} onSubmit={this.onSubmitForm}>
                  <LogoContainer>
                    <Logo
                      src={
                        isDarkTheme
                          ? "https://i.ibb.co/gRZ1FmZ/letter-e-education-logo-design-element-logo-design-business-card-282939-257-copy.jpg"
                          : "https://i.ibb.co/QcTcvD5/letter-e-education-logo-design-element-logo-design-business-card-282939-257.jpg"
                      }
                      alt="website logo"
                    />
                  </LogoContainer>
                  <InputFieldContainer>
                    <InputFieldLabel dark={isDarkTheme} htmlFor="username">
                      USERNAME
                    </InputFieldLabel>
                    <InputField
                      id="username"
                      type="text"
                      value={username}
                      onChange={this.onChangeUsername}
                      placeholder="Username"
                      color={isDarkTheme}
                    />
                  </InputFieldContainer>
                  <InputFieldContainer>
                    <InputFieldLabel dark={isDarkTheme} htmlFor="password">
                      PASSWORD
                    </InputFieldLabel>
                    <InputField
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={this.onChangePassword}
                      placeholder="Password"
                      color={isDarkTheme}
                    />
                  </InputFieldContainer>
                  <CheckBoxContainer>
                    <CheckBox
                      id="showPassword"
                      type="checkbox"
                      onChange={this.onChangeShowPassword}
                    />
                    <CheckBoxLabel htmlFor="showPassword" dark={isDarkTheme}>
                      Show Password
                    </CheckBoxLabel>
                  </CheckBoxContainer>
                  <LoginButton type="submit">Login</LoginButton>
                  {errorMessage.length !== 0 && (
                    <ErrorMessage>*{errorMessage}</ErrorMessage>
                  )}
                </LoginForm>
              </LoginPage>
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default LoginRoute;

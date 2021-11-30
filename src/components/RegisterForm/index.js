import { Component } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
import "./index.css";
import {
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

class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    showPassword: false,
    setSubmitted: false,
    setError: false,
    registerDetails: []
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value, setSubmitted: false });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value, setSubmitted: false });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value, setSubmitted: false });
  };

  onChangeShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { username, password, email } = this.state;
    const updatedDetails = {
      username: username,
      email: email,
      password: password
    };
    if (username === "" || password === "" || email === "") {
      this.setState({ setError: false });
    } else {
      this.setState({
        setSubmitted: true,
        setError: false,
        registerDetails: updatedDetails
      });
    }
  };

  // Showing success message if user is true

  render() {
    const {
      username,
      registerDetails,
      password,
      email,
      showPassword,
      setError,
      setSubmitted
    } = this.state;
    console.log(registerDetails);
    const successMessage = () => {
      return (
        <div
          className="success"
          style={{
            display: setSubmitted ? "" : "none"
          }}
        >
          <h1>User {username} successfully registered!!</h1>
        </div>
      );
    };

    // Showing error message if error is true
    const errorMessage = () => {
      return (
        <div
          className="error"
          style={{
            display: setError ? "" : "none"
          }}
        >
          <h1>Please enter all the fields</h1>
        </div>
      );
    };

    return (
      <Context.Consumer>
        {(value) => {
          const { isDarkTheme } = value;
          const registerBgTheme = isDarkTheme
            ? "dark-bg-register"
            : "light-bg-register";

          return (
            <div className={`register-route-container-bg ${registerBgTheme}`}>
              <div className="login-header">
                <Link to="/login">
                  <button type="button" className="login-route-login-button">
                    Login
                  </button>
                </Link>
                {/* <Link to="/register">
                                    <button type="button" className="login-route-login-button">Register</button>
                                </Link> */}
              </div>

              <div className="messages">
                {errorMessage()}
                {successMessage()}
              </div>

              <div className="form-container-css">
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
                    <InputFieldLabel dark={isDarkTheme} htmlFor="email">
                      EMAIL
                    </InputFieldLabel>
                    <InputField
                      id="email"
                      type="text"
                      value={email}
                      onChange={this.onChangeEmail}
                      placeholder="Email"
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
                  <LoginButton type="submit">Register</LoginButton>
                  {/*{errorMessage.length !== 0 && (
                                        <ErrorMessage>*{errorMessage}</ErrorMessage>
                                        )}*/}
                </LoginForm>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}
export default RegisterForm;

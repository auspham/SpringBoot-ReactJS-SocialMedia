import React from "react";
import loginImg from "../../login.svg";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AccountProfileService from "../../api/todo/AccountProfileService";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      studentnumber: this.props.studentnumber,
      email: this.props.email,
      phonenumber: this.props.phonenumber,
      aboutme: this.props.aboutme,
      usernamecheck: false
    }
    this.validate = this.validate.bind(this)

  }

  checkDuplicateUser(username) {

    AccountProfileService.checkDuplicateUsername(username)
      .then(response => {
        console.warn(response.data);

        if (response.data == true){
          this.setState({
            usernamecheck: true
          });
        }
        else if(response.data == false){
          this.setState({
            usernamecheck: false
          });
        }

      })
  }

  validate(values) {
    let errors = {}

    const nameCheck = /^[a-zA-Z\s]*$/
    const phoneCheck = /^\(?(?:\+?61|0)(?:(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$/
    const emailCheck = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const studentnumberCheck = /^s[0-9]{7}$/
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/

    this.checkDuplicateUser(values.username);

    if (values.username == null) {
      errors.username = "Please enter your username"
    }

    else if (this.state.usernamecheck == true) {

      console.warn("test checkusername");
      errors.username = "This username already exists";
    }


    if (!passwordCheck.test(values.password)) {
      errors.password = "Minumum 8 characters long, 1 lower and upper case, 1 number"
    }

    if (values.retypepassword != values.password) {
      errors.retypepassword = "Password doesn't match"
    }

    if (values.firstname == null) {
      errors.firstname = 'Enter your first name'
    } else if (!nameCheck.test(values.firstname)) {
      errors.firstname = 'Please enter a valid name'
    }

    if (values.lastname == null) {
      errors.lastname = 'Enter your last name'
    } else if (!nameCheck.test(values.lastname)) {
      errors.lastname = 'Please enter a valid name'
    }

    if (values.phonenumber == null) {
      errors.phonenumber = 'Enter your phone number'
    } else if (!phoneCheck.test(values.phonenumber)) {
      errors.phonenumber = 'Please enter a valid phone number'
    }

    if (values.email == null) {
      errors.email = 'Enter your email'
    } else if (!emailCheck.test(values.email)) {
      errors.email = 'Please enter a valid email'
    }

    if (values.studentnumber == null) {
      errors.studentnumber = 'Enter your student number'
    } else if (!studentnumberCheck.test(values.studentnumber)) {
      errors.studentnumber = 'Please enter a valid student number (includes the s)'
    }

    return errors

  }

  render() {
    return (
      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <Formik className="form"

            onSubmit={this.props.handleRegister}
            validateOnChange={this.validate}
            validateOnBlur={this.validate}
            validateOnSubmit={this.validate}
            validate={this.validate}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>

                  <fieldset className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field className="field" type="text" name="username" />
                    <ErrorMessage name="username" component="div"
                      className="checkError" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field className="field" type="password" name="password" />
                    <ErrorMessage name="password" component="div"
                      className="checkError" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="retypepassword">Retype Password</label>
                    <Field className="field" type="password" name="retypepassword" />
                    <ErrorMessage name="retypepassword" component="div"
                      className="checkError" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <Field className="field" type="text" name="firstname" />
                    <ErrorMessage name="firstname" component="div"
                      className="checkError" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <Field className="field" type="text" name="lastname" />
                    <ErrorMessage name="lastname" component="div"
                      className="checkError" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="studentnumber">Student Number</label>
                    <Field className="field" type="text" name="studentnumber" />
                    <ErrorMessage name="studentnumber" component="div"
                      className="checkError" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field className="field" type="text" name="email" />
                    <ErrorMessage name="email" component="div"
                      className="checkError" />
                  </fieldset>

                  <fieldset className="form-group">
                    <label htmlFor="phonenumber">Phone number</label>
                    <Field className="field" type="text" name="phonenumber" />
                    <ErrorMessage name="phonenumber" component="div"
                      className="checkError" />
                  </fieldset>

                  <button type="submit" className="btn text-center btn-primary center"
                  >
                    Register
              </button>
                </Form>
              )
            }
          </Formik>

        </div>
      </div>

    );
  }
}

import React, { Component } from "react";
import "./profile.scss";
import { Formik, Form, Field, ErrorMessage } from 'formik';

class UpdateDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            studentnumber: this.props.studentnumber,
            email: this.props.email,
            phonenumber: this.props.phonenumber,
            aboutme: this.props.aboutme
        }
        this.validate = this.validate.bind(this)
    }

    validate(values) {
        let errors = {}
        const nameCheck = /^[a-zA-Z\s]*$/
        const phoneCheck = /(\(+61\)|\+61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){6,9}/
        const emailCheck = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        if (!values.firstname) {
            errors.firstname = 'Enter your first name'
        } else if (!nameCheck.test(values.firstname)) {
            errors.firstname = 'Please enter a valid name'
        }

        if (!values.lastname) {
            errors.lastname = 'Enter your last name'
        } else if (!nameCheck.test(values.lastname)) {
            errors.lastname = 'Please enter a valid name'
        }

        if (!values.phonenumber) {
            errors.phonenumber = 'Enter your phone number'
        } else if (!phoneCheck.test(values.phonenumber)) {
            errors.phonenumber = 'Please enter a valid phone number'
        }

        if (!values.email) {
            errors.email = 'Enter your email'
        } else if (!emailCheck.test(values.email)) {
            errors.lastname = 'Please enter a valid email'
        }
        

        return errors

    }

    render() {
        
        return (
            <div className="col3">
                <div className="ui-block">
                    <div className="ui-title">Update Contact Details</div>
                    <div className="ui-content">
                        <div className="personal-info">
                        <Formik
                     
                      //  onSubmit={this.onSubmit}
                       initialValues={this.state}
                        validateOnChange={this.validate}
                        validateOnBlur={this.validate}
                        validateOnSubmit ={this.validate}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="firstname" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="lastname" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="email" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="phonenumber" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="aboutme" component="div"
                                        className="alert alert-warning" />    
                                    <fieldset className="form-group">
                                        <label className="title">First name</label>
                                        <Field className="form-control" type="text" name="firstname" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="title">Last name</label>
                                        <Field className="form-control" type="text" name="lastname" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="title">Student number</label>
                                        <Field className="form-control" type="text" readOnly name="studentnumber" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="title">Email</label>
                                        <Field className="form-control" type="text" name="email" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="title">Phone number</label>
                                        <Field className="form-control" type="text" name="phonenumber" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="title">About me</label>
                                        <Field className="form-control" type="text" name="aboutme" />
                                    </fieldset>

                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                            
                                </Formik>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateDetails
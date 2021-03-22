import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import {validateField} from './validator';
import {FORM_CONTROLS} from './config';

import TextInput from './TextInput';

class MailForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formIsValid: false,

            // imported from config file
            // includes all the form fields
            // variables with their validation
            // rules
            formControls: {...FORM_CONTROLS}
        };
    }

    /**
     *  This function changes the state
     *  field in response of input change
     *
     * @param event
     */
    handleChange = (event) => {
        const {name, value} = event.target;

        const updatedControls = {
            ...this.state.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };

        updatedControls[name] = {
            ...updatedFormElement,
            value,
            touched: true,
            valid: validateField(value, updatedFormElement.validationRules)
        };

        this.setState({
            formIsValid: _.every(updatedControls, 'valid'),
            formControls: updatedControls
        });
    };

    /**
     * This function submits
     * the form for sendinf
     * email
     *
     * @param event
     */
    submitForm = (event) => {
        event.preventDefault();

        if ( !this.state.formIsValid ) {
            return;
        }

        axios
            .post('http://localhost/send', _.mapValues(this.state.formControls, 'value'))
            .then( (response) => {
                console.log('success');
            },  (error) => {
                console.log('error');
            });
    };

    /**
     * This function returns
     * the form elemets.
     *
     * @returns {Array}
     */
    getFormFields() {
        return _.map(this.state.formControls, (formControl, fieldName) => {
            return (
                <div className="form-group" key={fieldName}>
                    <label htmlFor={fieldName}>{formControl.label}:</label>
                    <TextInput
                        fieldName={fieldName}
                        className="form-input-text"
                        value={formControl.value}
                        onChange={this.handleChange}
                        valid={formControl.valid}
                        touched={formControl.touched}
                    />
                </div>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <h3>Jones form</h3>

                {this.getFormFields()}

                <div className="button-holder">
                    <button type="submit" className="form-button" disabled={!this.state.formIsValid}
                            onClick={this.submitForm}>
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default MailForm;
const MIN_NAME_LENGTH = 2;

export const FORM_CONTROLS = {
    firstName: {
        label: 'First Name',
        value: '',
        valid: false,
        validationRules: {
            isRequired: true,
            minLength: MIN_NAME_LENGTH,
            isAlphabet: true
        }
    },

    lastName: {
        label: 'Last Name',
        value: '',
        valid: false,
        validationRules: {
            isRequired: true,
            minLength: MIN_NAME_LENGTH,
            isAlphabet: true
        }
    },

    mailAddress: {
        label: 'Mail Address',
        value: '',
        valid: false,
        validationRules: {
            isRequired: true,
            isEmail: true
        }
    },

    phoneNumber: {
        label: 'Phone Number',
        value: '',
        valid: false,
        validationRules: {
            isRequired: true,
            isPhoneNumber: true
        }
    },
};
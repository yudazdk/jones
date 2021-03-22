/**
 * Checks to confirm that field is required
 *
 * @param value
 * @returns {boolean}
 */
const requiredValidator = value => {
    return value.trim() !== '';
};

/**
 * Checks minimum length
 *
 * @param value
 * @param minLength
 * @returns {boolean}
 */
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
};

const alphabetValidator = (value) => {
    return /^[a-zA-Z]+$/.test(value);
};

/**
 * Email validation
 *
 * @param value
 * @returns {boolean}
 */
const emailValidator = value => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};

/**
 * Validates phone number that
 * should be 10 digigts
 *
 * @param value
 */
const phoneNumberValidator = value => {
    return /^[0-9]{10}$/.test(value)
};

/**
 *
 *
 * @param value
 * @param rules
 * @returns {boolean}
 */
export function validateField(value, rules) {
    let isValid = true;

    for (let rule in rules) {

        switch (rule) {
            case 'minLength':
                isValid = isValid && minLengthValidator(value, rules.minLength);
                break;

            case 'isRequired':
                isValid = isValid && requiredValidator(value);
                break;

            case 'isEmail':
                isValid = isValid && emailValidator(value);
                break;

            case 'isAlphabet':
                isValid = isValid && alphabetValidator(value);
                break;

            case 'isPhoneNumber':
                isValid = isValid && phoneNumberValidator(value);
                break;

            default:
                isValid = true;
                break;
        }

        if ( !isValid ) {
            return false;
        }
    }

    return isValid;
}
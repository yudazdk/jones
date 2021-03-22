import React from 'react';

const TextInput = (props) => {
    const {fieldName, fieldValue, onChange, valid, touched, className} = props;

    function getClassName() {
        if ( !touched) {
            return className;
        } else {
            return valid ? className : className + ' form-input-error';
        }
    }

    return (
        <input type="text"
               className={getClassName()}
               id={fieldName}
               name={fieldName}
               value={fieldValue}
               onChange={onChange}
        />
    );
};

export default TextInput;
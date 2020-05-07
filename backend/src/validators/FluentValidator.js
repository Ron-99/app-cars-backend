'use strict';

let errors = [];

function ValidationContract(){
    errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
    if(!value || value.length <= 0)
        errors.push({message: message});
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if(!value || value.length < min)
        errors.push({message: message});
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if(!value || value.length > max)
        errors.push({message: message});
}

ValidationContract.prototype.hasLen = (value, len, message) => {
    if(!value || value.toString().length !== len)
        errors.push({message: message});
}

ValidationContract.prototype.isInteger = (value, message) => {
    if(!value || !Number.isInteger(value))
        errors.push({message: message});
}

ValidationContract.prototype.isEmail = (value, message) => {
    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if(!reg.test(value))
        errors.push({message: message});
}



ValidationContract.prototype.errors = () => errors;

ValidationContract.prototype.clear = () => errors = [];

ValidationContract.prototype.isValid = () => errors.length === 0;

module.exports = ValidationContract;
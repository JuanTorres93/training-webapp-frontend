import * as Yup from 'yup';

const regexDangerousChars = /^[^<>]*$/;
const regexDangerousCharsErrorMsg = ' must not contain the characters <, >';
const requiredFieldErrorMsg = ' is a required field';

export const userValidationSchema = Yup.object({
    alias: Yup.string()
        .required('alias' + requiredFieldErrorMsg)
        .trim()
        .strict(true)
        .matches(regexDangerousChars, 'alias' + regexDangerousCharsErrorMsg)
    ,
    email: Yup.string()
        .required('email' + requiredFieldErrorMsg)
        .email('Must be a valid email')
        .trim()
        .strict(true)
        .matches(regexDangerousChars, 'email' + regexDangerousCharsErrorMsg)
    ,
    last_name: Yup.string()
        .required('last_name' + requiredFieldErrorMsg)
        .trim()
        .strict(true)
        .matches(regexDangerousChars, 'last_name' + regexDangerousCharsErrorMsg)
    ,
    second_last_name: Yup.string()
        .required('second_last_name' + requiredFieldErrorMsg)
        .trim()
        .strict(true)
        .matches(regexDangerousChars, 'second_last_name' + regexDangerousCharsErrorMsg)
    ,
    expirationDate: Yup.string()
        .required('expirationDate' + requiredFieldErrorMsg)
        .trim()
        .strict(true)
        .matches(regexDangerousChars, 'expirationDate' + regexDangerousCharsErrorMsg)
    ,
    img: Yup.string()
        .required('img' + requiredFieldErrorMsg)
        .trim()
        .strict(true)
        .matches(regexDangerousChars, 'img' + regexDangerousCharsErrorMsg)
    ,
});

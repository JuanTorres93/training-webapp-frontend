import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import { dangerousSymbols } from "../../utils/validatorUtils";
import { useState } from "react";
import DangerousSymbolNotifier from "../dangerousSymbolNotifier/DangerousSymbolNotifier";
import { register } from "../../serverAPI/register";
import { login } from "../../serverAPI/login";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const navigate = useNavigate();

    const [ passwordHasDangerousSymbol, setPasswordHasDangerousSymbol ] = useState("")
    const [ emailHasDangerousSymbol, setEmailHasDangerousSymbol ] = useState("")
    const [ fisrtNameHasDangerousSymbol, setFirstNameHasDangerousSymbol ] = useState("")
    const [ lastNameHasDangerousSymbol, setLastNameHasDangerousSymbol ] = useState("")
    const [ secondLastNameHasDangerousSymbol, setSecondLastNameHasDangerousSymbol ] = useState("")
    const [ emailAlreadyInUse, setEmailAlreadyInUse ] = useState(false)

    const lookForDangerousSymbols = (type) => (event) => {
        // type can 'email', 'password', "first_name", "last_name" or "second_last_name"
        let hasDangeorusSymbol = false;
        let value = event.target.value;

        dangerousSymbols.forEach(ds => {
            if (value.includes(ds)) {
                value = value.replaceAll(ds, '')
                hasDangeorusSymbol = true;
            }
        });

        if (hasDangeorusSymbol) {
            if (type === 'email') {
                setEmailHasDangerousSymbol(true);
            } else if (type === 'first_name') {
                setFirstNameHasDangerousSymbol(true);
            } else if (type === 'last_name') {
                setLastNameHasDangerousSymbol(true);
            } else if (type === 'second_last_name') {
                setSecondLastNameHasDangerousSymbol(true);
            } else {
                setPasswordHasDangerousSymbol(true);
            };
        } else {
            if (type === 'email') {
                setEmailHasDangerousSymbol(false);
            } else if (type === 'first_name') {
                setFirstNameHasDangerousSymbol(false);
            } else if (type === 'last_name') {
                setLastNameHasDangerousSymbol(false);
            } else if (type === 'second_last_name') {
                setSecondLastNameHasDangerousSymbol(false);
            }  else {
                setPasswordHasDangerousSymbol(false);
            };
        };
        event.target.value = value;
    };

    const submitForm = async (event) => {
        event.preventDefault();
        const firstName = event.target.firstName.value.trim();
        const lastName = event.target.lastName.value.trim();
        const password = event.target.password.value.trim();
        const email = event.target.email.value.trim();
        const secondLastName = (event.target.secondLastName.value.trim().length === 0) ? null: event.target.secondLastName.value.trim();

        const response = await register(firstName, lastName, email, password, secondLastName);
        
        if (response.status === 409) {
            setEmailAlreadyInUse(true)
        } else {
            setEmailAlreadyInUse(false)
            // If registration succesful, then automatically login the new user
            const response = await login(email, password);
            if (response.status === 200) {
                navigate('/products');
            }
        };
    };

    return (
        <>
            {/* <Form className={styles.form} method="post" onSubmit={submitForm}> */}
            <form className={styles.form} method="post" onSubmit={submitForm}>
                {/* First Name */}
                <label htmlFor="firstName">First name *</label>
                <div className={styles.inputWrapper}>
                    <input type="text" name="firstName" id="firstName" onChange={lookForDangerousSymbols('first_name')}
                        required={true} />

                    <DangerousSymbolNotifier hidden={!fisrtNameHasDangerousSymbol} />
                </div>

                {/* Last name */}
                <label htmlFor="lastName">Last name *</label>
                <div className={styles.inputWrapper}>
                    <input type="text" name="lastName" id="lastName" onChange={lookForDangerousSymbols('last_name')}
                        required={true} />

                    <DangerousSymbolNotifier hidden={!lastNameHasDangerousSymbol} />
                </div>

                {/* Second last name */}
                <label htmlFor="secondLastName">Second last name (optional)</label>
                <div className={styles.inputWrapper}>
                    <input type="text" name="secondLastName" id="secondLastName" onChange={lookForDangerousSymbols('second_last_name')}
                        required={false} />

                    <DangerousSymbolNotifier hidden={!secondLastNameHasDangerousSymbol} />
                </div>

                {/* Email */}
                <label htmlFor="email">Email *</label>
                <div className={styles.inputWrapper}>
                    <input type="email" name="email" id="email" onChange={lookForDangerousSymbols('email')}
                        required={true}
                        pattern=".+@.+\..+" />

                    <DangerousSymbolNotifier hidden={!emailHasDangerousSymbol} />
                    <p hidden={!emailAlreadyInUse}>Email is already in use</p>
                </div>

                {/* Password */}
                <label htmlFor="password">Password *</label>
                <div className={styles.inputWrapper}>
                    {/* TODO validate strong password */}
                    <input type="password" name="password" id="password" onChange={lookForDangerousSymbols('password')}
                        required={true}
                        minLength={12} />
                    <DangerousSymbolNotifier hidden={!passwordHasDangerousSymbol} />
                </div>

                <div className={styles.submitWrapper}>
                    <Link to='/login'>Login</Link>
                    <button type="submit">Register</button>
                </div>
            </form>
            {/* </Form> */}
        </>
    );
};
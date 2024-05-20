import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { dangerousSymbols } from "../../utils/validatorUtils";
import { useState } from "react";
import DangerousSymbolNotifier from "../dangerousSymbolNotifier/DangerousSymbolNotifier";
import { login } from "../../serverAPI/login";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ passwordHasDangerousSymbol, setPasswordHasDangerousSymbol ] = useState("")
    const [ emailHasDangerousSymbol, setEmailHasDangerousSymbol ] = useState("")

    const lookForDangerousSymbols = (type) => (event) => {
        // type can 'email' or 'password'
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
            } else {
                setPasswordHasDangerousSymbol(true);
            };
        } else {
            if (type === 'email') {
                setEmailHasDangerousSymbol(false);
            } else {
                setPasswordHasDangerousSymbol(false);
            };
        };
        event.target.value = value;
    };

    const submitForm = async (event) => {
        event.preventDefault();
        const password = event.target.password.value.trim();
        const email = event.target.email.value.trim();

        const response = await login(email, password);

        if ( response.status === 200) {
            console.log('Login successful');

            const jsonResponse = await response.json();
            const user = jsonResponse.user;
            // TODO set user when login with OAuth
            dispatch(setUser(user));
            navigate('/products');
        } else {
            console.log("Error when trying to log in, try again");
            navigate('/login');
        }
    };

    return (
        <>
            {/* <Form className={styles.form} method="post" onSubmit={submitForm}> */}
            <form className={styles.form} method="post" onSubmit={submitForm}>
                {/* Email */}
                <label htmlFor="email">Email *</label>
                <div className={styles.inputWrapper}>
                    <input type="email" name="email" id="email" onChange={lookForDangerousSymbols('email')}
                        required={true}
                        pattern=".+@.+\..+" />

                    <DangerousSymbolNotifier hidden={!emailHasDangerousSymbol} />
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
                    <Link to='/register'>Register</Link>
                    <button type="submit">Login</button>
                </div>
            </form>
            {/* </Form> */}
        </>
    );
};
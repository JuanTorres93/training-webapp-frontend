import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    registerUser,
    selectUserIsLoading,
} from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';


const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userIsLoading = useSelector(selectUserIsLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(registerUser({ username, email, password }))
            .then((response) => {
                if (Object.keys(response.payload).includes('id')) {
                    // clear form
                    setUsername('');
                    setEmail('');
                    setPassword('');

                    navigate('/');
                }
            }).catch((error) => {
                console.error('Registration failed', error);
            });
    }

    return (
        <form className={styles.form} onSubmit={userIsLoading ? () => { } : handleRegister}>
            {/* Username */}
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                    <label htmlFor='username'>Username</label>
                    <input
                        className={styles.inputField}
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        // Max value defined in DB
                        maxLength="40"
                        required />
                </div>
            </div>

            {/* email */}
            <div className={styles.inputContainer}>

                <div className={styles.inputWrapper}>
                    <label htmlFor='email'>Email</label>
                    <input
                        className={styles.inputField}
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // Max value defined in DB
                        maxLength="70"
                        required />
                </div>
            </div>

            {/* Password */}
            <div className={styles.inputContainer}>

                <div className={styles.inputWrapper}>
                    <label htmlFor='password'>Password</label>
                    <input className={styles.inputField} id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
            </div>

            {/* Submit */}
            <div className={styles.submitWrapper}>
                <button className={styles.submitButton} type="submit" disabled={userIsLoading}>
                    {userIsLoading ? <div className='spinner-body-size'></div> : 'Register'}
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;
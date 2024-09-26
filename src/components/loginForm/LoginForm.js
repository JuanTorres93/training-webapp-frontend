import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = ({
    user,
    userIsLoading
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        // If user exists, then redirect to /
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(loginUser({ username, password }));
    }

    return (
        <form className={styles.formContainer} onSubmit={handleLogin}>
            <div className={styles.labelAndInput}>
                <label htmlFor='username'>Username</label>
                <input
                    className={styles.inputField}
                    id='username'
                    type="text"
                    value={username}
                    disabled={userIsLoading}
                    onChange={(e) => setUsername(e.target.value)}
                    // Max value defined in DB
                    maxLength="40"
                    required
                />
            </div>

            <div className={styles.labelAndInput}>
                <label htmlFor='password'>Password</label>
                <input
                    className={styles.inputField}
                    id='password'
                    type="password"
                    value={password}
                    disabled={userIsLoading}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button
                className={styles.submitButton}
                type="submit"
                disabled={userIsLoading || !username || !password}
            >
                {
                    userIsLoading ? <div className='spinner-body-size'></div> : 'Login'
                }
            </button>
        </form>
    )
}

export default LoginForm;

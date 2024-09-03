import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectUser, selectUserIsLoading } from '../../features/user/userSlice';
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
                <input id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className={styles.labelAndInput}>
                <label htmlFor='password'>Password</label>
                <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button
                className={styles.submitButton}
                type="submit"
                disabled={userIsLoading}
            >
                {
                    userIsLoading ? 'Logging in...' : 'Login'
                }
            </button>
        </form>
    )
}

export default LoginForm;

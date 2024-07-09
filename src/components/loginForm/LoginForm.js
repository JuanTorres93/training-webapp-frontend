import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, selectUser } from '../../features/user/userSlice';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectUser);

    // If user exists, then redirect to /
    if (user) {
        navigate('/');
    }

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(loginUser({ username: username, password }));
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

            <button className={styles.submitButton} type="submit">Login</button>
        </form>
    )
}

export default LoginForm;

import React, { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleLogin}>
                <label htmlFor='email'>Email</label>
                <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor='password'>Password</label>
                <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className={styles.submitButton} type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;

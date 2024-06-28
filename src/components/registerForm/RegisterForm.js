import React, { useState } from 'react';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        // Assuming register function is exported from src/serverAPI/register.js
        // You might need to adjust the import based on your project structure
        try {
            // const response = await register(username, email, password);
            // console.log('Registration successful', response);
            console.log('Registration successful');
        } catch (error) {
            console.error('Registration failed', error);
        }
    }

    return (
        <div className={styles.form}>
            <form onSubmit={handleRegister}>
                <div className={styles.inputWrapper}>
                    <label htmlFor='username'>Username</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor='email'>Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor='password'>Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className={styles.submitWrapper}>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
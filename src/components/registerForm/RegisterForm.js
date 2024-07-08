import React, { useState } from 'react';
import styles from './RegisterForm.module.css';

import { register } from '../../serverAPI/users';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await register(username, email, password);

            if (response.id) {
                console.log('Registration successful', response);
                // clear form
                setUsername('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            // TODO notify user about errors and how to fix them
            console.error('Registration failed', error);
        }
    }

    return (
        <div className={styles.form}>
            <form onSubmit={handleRegister}>
                {/* Username */}
                <div className={styles.inputWrapper}>
                    <label htmlFor='username'>Username</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                {/* email */}
                <div className={styles.inputWrapper}>
                    <label htmlFor='email'>Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                {/* Password */}
                <div className={styles.inputWrapper}>
                    <label htmlFor='password'>Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                {/* Submit */}
                <div className={styles.submitWrapper}>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
import React from 'react';
import styles from './OAuthLogin.module.css';

const OAuthLogin = ({ callbackUrl, serviceName, logoPath }) => {
    return (
        <div className={styles.oauthLoginContainer}>
            <a className={styles.oauthLoginButton} href={callbackUrl}>
                <img className={styles.oauthLogo} src={logoPath} alt={`${serviceName} logo`} />
                <span className={styles.serviceName}>{serviceName}</span>
            </a>
        </div>
    );
};

export default OAuthLogin;
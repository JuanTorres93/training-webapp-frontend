import React from 'react'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import PagePresenter from '../../components/pagePresenter/PagePresenter'
import LoginForm from '../../components/loginForm/LoginForm'
import OAuthLogin from '../../components/oauthLogin/OAuthLogin'
import Alert from '../../components/modals/alert/Alert'

import styles from './LoginPage.module.css'

import { serverBaseURL } from '../../serverAPI/serverAPIConfig'
import { selectUser, selectUserIsLoading } from '../../features/user/userSlice'

const LoginPage = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector(selectUser);
    const userIsLoading = useSelector(selectUserIsLoading);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        if (queryParams.size > 0) {
            try {
                const msg = queryParams.get("msg");
                if (msg === 'Login failed') setIsAlertOpen(true);
            } catch (error) {
                setIsAlertOpen(false);
            }
        }

    }, [location]);

    return (
        <>
            <PagePresenter children={
                <div className={styles.pageContainer}>
                    <h2 className='heading'>Login</h2>
                    <LoginForm
                        user={user}
                        userIsLoading={userIsLoading}
                    />

                    <div className={styles.dividerContainer}>
                        <span className={styles.dividerText}>OR</span>
                    </div>

                    <div className={styles.oauthContainer}>
                        <OAuthLogin
                            callbackUrl={`${serverBaseURL}/login/google`}
                            serviceName="Google"
                            logoPath="/images/oauthLogos/googleLogo.png"
                        />
                        {/* <OAuthLogin
                        callbackUrl={`${serverBaseURL}/login/facebook`}
                        serviceName="Facebook"
                        logoPath="logo192.png"
                    /> */}
                    </div>
                </div>
            } />


            <Alert
                isOpen={isAlertOpen}
                onRequestClose={() => {
                    setIsAlertOpen(false)
                    navigate('/login')
                }}
                message='Login failed.'
            />
        </>
    )
}

export default LoginPage
import React from 'react'

import { useSelector } from 'react-redux'

import PagePresenter from '../../components/pagePresenter/PagePresenter'
import LoginForm from '../../components/loginForm/LoginForm'
import OAuthLogin from '../../components/oauthLogin/OAuthLogin'

import styles from './LoginPage.module.css'

import { serverBaseURL } from '../../serverAPI/serverAPIConfig'
import { selectUser, selectUserIsLoading } from '../../features/user/userSlice'

const LoginPage = () => {
    const user = useSelector(selectUser);
    const userIsLoading = useSelector(selectUserIsLoading);

    return (
        <PagePresenter children={
            <div className={styles.pageContainer}>
                <h2 className='heading'>Login</h2>
                <LoginForm
                    user={user}
                    userIsLoading={userIsLoading}
                />

                <div className={styles.oauthContainer}>
                    <OAuthLogin
                        callbackUrl={`${serverBaseURL}/login/google`}
                        serviceName="Google"
                        logoPath="favicon.ico"
                    />
                    {/* <OAuthLogin
                        callbackUrl={`${serverBaseURL}/login/facebook`}
                        serviceName="Facebook"
                        logoPath="logo192.png"
                    /> */}
                </div>
            </div>
        } />
    )
}

export default LoginPage
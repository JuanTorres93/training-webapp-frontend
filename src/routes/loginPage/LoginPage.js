import React from 'react'

import { useSelector } from 'react-redux'

import PagePresenter from '../../components/pagePresenter/PagePresenter'
import LoginForm from '../../components/loginForm/LoginForm'

import styles from './LoginPage.module.css'

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
            </div>
        } />
    )
}

export default LoginPage
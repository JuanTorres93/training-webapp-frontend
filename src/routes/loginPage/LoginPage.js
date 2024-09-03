import React from 'react'

import { useSelector } from 'react-redux'

import PagePresenter from '../../components/pagePresenter/PagePresenter'
import LoginForm from '../../components/loginForm/LoginForm'

import { selectUser, selectUserIsLoading } from '../../features/user/userSlice'

const LoginPage = () => {
    const user = useSelector(selectUser);
    const userIsLoading = useSelector(selectUserIsLoading);

    return (
        <PagePresenter children={
            <LoginForm
                user={user}
                userIsLoading={userIsLoading}
            />
        } />
    )
}

export default LoginPage
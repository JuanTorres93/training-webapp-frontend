import React from 'react'
import PagePresenter from '../../components/pagePresenter/PagePresenter'
import LoginForm from '../../components/loginForm/LoginForm'

const LoginPage = () => {
    return (
        <PagePresenter children={
            <LoginForm />
        }/>
    )
}

export default LoginPage
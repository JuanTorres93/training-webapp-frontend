import RegisterForm from "../../components/registerForm/RegisterForm";
import PagePresenter from "../../components/pagePresenter/PagePresenter";

export default function RegisterPage() {
    return (
        <PagePresenter children={
            <RegisterForm />
        }/>
    );
};
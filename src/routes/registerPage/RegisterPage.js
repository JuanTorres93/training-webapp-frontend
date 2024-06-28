import RegisterForm from "../../components/registerForm/RegisterForm";
import PagePresenter from "../../components/pagePresenter/PagePresenter";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
    return (
        <PagePresenter children={
            <RegisterForm />
        }/>
    );
};
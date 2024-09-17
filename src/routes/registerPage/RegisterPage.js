import RegisterForm from "../../components/registerForm/RegisterForm";
import PagePresenter from "../../components/pagePresenter/PagePresenter";

import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
    return (
        <PagePresenter children={
            <div className={styles.pageContainer}>
                <h2 className="heading">Register</h2>
                <RegisterForm />
            </div>
        } />
    );
};
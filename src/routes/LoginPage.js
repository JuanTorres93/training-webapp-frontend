import LoginForm from '../components/loginForm/LoginForm';

// TODO include this in its own component
import { loginGoogle } from '../serverAPI/login';
import { serverBaseURL } from '../serverAPI/serverAPIConfig';

export default function LoginPage() {
    // TODO include this in its own component
    const handleClick = async (event) => {
        // TODO borrar
        console.log("Frontend: Logging with google account");
        // await loginGoogle();
        window.open(serverBaseURL + '/login/google', '_self');
    };

    return (
        <>
            <LoginForm />
            {/* TODO include this in its own component */}
            <button type="submit" onClick={handleClick}>
                Login with google
            </button>
        </>
    );
};
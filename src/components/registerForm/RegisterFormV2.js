import { Link } from 'react-router-dom';

const RegisterFormV2 = () => {
    return (
        <div className="register-form">
            <figure className="register-form__image-box">
                {/* TODO change image */}
                <img src="/images/lastCTA.png" alt="register form image" className="register-form__image" />
            </figure>

            <div className="register-form__form-box">
                <div className="register-form__title-box">
                    {/* TODO TRADUCIR */}
                    <h2 className="register-form__title">Create an account</h2>
                    <p className="register-form__title-subtext">
                        {/* TODO TRADUCIR y dar estilo a Link */}
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>

                <form className="register-form__form">
                    {/* TODO sanitize all inputs. Use previous form */}
                    {/* TODO traducir */}
                    <div className="register-form__input-box">
                        <input type="text" id="username" placeholder='Username' className="base-input-text register-form__input" required />
                        <label htmlFor="username" className="register-form__label-text">Username</label>
                    </div>

                    <div className="register-form__input-box">
                        <input type="email" placeholder='Email' id="email" className="base-input-text register-form__input" required />
                        <label htmlFor="email" className="register-form__label-text">Email</label>
                    </div>

                    <div className="register-form__input-box">
                        <input type="password" id="password" placeholder='Password' className="base-input-text register-form__input" required />
                        <label htmlFor="password" className="register-form__label-text">Password</label>
                    </div>

                    {/* Accept terms and conditions */}
                    <div className="register-form__input-box">
                        <input type="checkbox" id="terms" className="register-form__checkbox" required />
                        <label htmlFor="terms" className="register-form__label">I accept the terms and conditions</label>
                    </div>

                    <button type="submit" className="register-form__submit-button">Register</button>
                </form>

                {/* OAuth logins */}
                <div className="separator-text-between-lines">Or register with</div>

                <div className="register-form__oauth-box">
                    {/* TODO incluir mi componenente OAuth */}
                    <button className="register-form__oauth-button">
                        <ion-icon name="logo-google"></ion-icon>
                    </button>
                    <button className="register-form__oauth-button">
                        <ion-icon name="logo-facebook"></ion-icon>
                    </button>
                    <button className="register-form__oauth-button">
                        <ion-icon name="logo-twitter"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterFormV2;
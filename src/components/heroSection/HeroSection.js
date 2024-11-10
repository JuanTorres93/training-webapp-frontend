import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HeroSection() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClick = () => {
        navigate('/register');
    };

    return (
        <header id='hero-section' className="hero">
            <div className="hero__box">
                <h1 className="hero__text">
                    <span className="hero__text--big">
                        {t('hero-title')}
                    </span>

                    <span className="hero__text--small">
                        {t('hero-subtitle-1')}&nbsp;
                    </span>

                    <span className="hero__text--small hero__text--accent">
                        {t('hero-subtitle-2')}
                    </span>
                </h1>

                <Link to="/register" className="hero__button">
                    {t('hero-button-text')}
                </Link>
            </div>
        </header>
    );
};

export default HeroSection;

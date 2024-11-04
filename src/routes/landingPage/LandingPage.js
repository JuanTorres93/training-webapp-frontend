import NavHorizontal from "../../components/nav/Nav";
import HeroSection from "../../components/heroSection/HeroSection";
import BenefitsSection from "../../components/benefitsSection/BenefitsSection";
import FeatureSection from "../../components/featureSection/FeatureSection";
import LastCTA from "../../components/lastCTA/LastCTA";
import CompetitiveAdvantage from "../../components/competitiveAdvantage/CompetitiveAdvantage";

import { useTranslation } from "react-i18next";

export default function LandingPage() {
    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        if (i18n.language === "en") {
            return i18n.changeLanguage("es");
        } else {
            return i18n.changeLanguage("en");
        }
    };

    const features = [
        {
            title: t('feature-1-title'),
            description: t('feature-1-description'),
            // TODO include actual icon
            image: "/images/logos/logo_border_small.svg",
            // image: <ion-icon name="moon-outline"></ion-icon>
        },
        {
            title: t('feature-2-title'),
            description: t('feature-2-description'),
            // TODO include actual icon
            image: "/images/logos/logo_border_small.svg",
        },
        {
            title: t('feature-3-title'),
            description: t('feature-3-description'),
            // TODO include actual icon
            image: "/images/logos/logo_border_small.svg",
        },
        {
            title: t('feature-4-title'),
            description: t('feature-4-description'),
            // TODO include actual icon
            image: "/images/logos/logo_border_small.svg",
        },
        {
            title: t('feature-5-title'),
            description: t('feature-5-description'),
            // TODO include actual icon
            image: "/images/logos/logo_border_small.svg",
        },
        {
            title: t('feature-6-title'),
            description: t('feature-6-description'),
            // TODO include actual icon
            image: "/images/logos/logo_border_small.svg",
        },
        {
            title: t('feature-7-title'),
            description: t('feature-7-description'),
            // TODO include actual icon
            image: "/images/logos/logo_border_small.svg",
        }
    ];

    const benefits = [
        {
            title: t('benefit-1-title'),
            items: t('benefit-1-items'),
            cta: t('benefit-1-cta'),
            icon: <ion-icon style={{ "--ionicon-stroke-width": "32px" }} name="barbell-outline"></ion-icon>,
        },
        {
            title: t('benefit-2-title'),
            items: t('benefit-2-items'),
            cta: t('benefit-2-cta'),
            icon: <ion-icon name="analytics-outline"></ion-icon>,
        },
        {
            title: t('benefit-3-title'),
            items: t('benefit-3-items'),
            cta: t('benefit-3-cta'),
            icon: <ion-icon name="flame-outline"></ion-icon>,
        },
        {
            title: t('benefit-4-title'),
            items: t('benefit-4-items'),
            cta: t('benefit-4-cta'),
            icon: <ion-icon name="leaf-outline"></ion-icon>,
        },
    ];

    return (
        <div className="landing">
            <NavHorizontal
                linkText1={t('nav-landing-1')}
                linkText2={t('nav-landing-2')}
                linkText3={t('nav-landing-3')}
                linkText4={t('nav-landing-4')}
                cbChangeLanguage={changeLanguage} />
            <HeroSection />
            {/* TODO Poner aquí la sección "Tu futuro" */}

            <BenefitsSection benefits={benefits} />

            <FeatureSection
                features={features}
            />
            {/* <LastCTA /> */}
        </div>
    );
};

import NavHorizontal from "../../components/nav/Nav";
import HeroSection from "../../components/heroSection/HeroSection";
import NicheSection from "../../components/nicheSection/NicheSection";
import BenefitsSection from "../../components/benefitsSection/BenefitsSection";
import FeatureSection from "../../components/featureSection/FeatureSection";
import TestimonialsSection from "../../components/testimonialsSection/TestimonialsSection";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { machineLanguage } from "../../i18n";

export default function LandingPage() {
    const [language, setLanguage] = useState(machineLanguage);

    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        if (i18n.language === "en") {
            setLanguage("es");
            return i18n.changeLanguage("es");
        } else {
            setLanguage("en");
            return i18n.changeLanguage("en");
        }
    };

    const nicheDescription = [
        {
            title: t('niche-1-title'),
            items: [
                {
                    icon: <ion-icon name="checkmark-outline"></ion-icon>,
                    isPositive: true,
                    reason: t('niche-1-reason-1'),
                    explanation: t('niche-1-explanation-1'),
                },
                {
                    icon: <ion-icon name="checkmark-outline"></ion-icon>,
                    isPositive: true,
                    reason: t('niche-1-reason-2'),
                    explanation: t('niche-1-explanation-2'),
                },
                {
                    icon: <ion-icon name="checkmark-outline"></ion-icon>,
                    isPositive: true,
                    reason: t('niche-1-reason-3'),
                    explanation: t('niche-1-explanation-3'),
                },
                {
                    icon: <ion-icon name="checkmark-outline"></ion-icon>,
                    isPositive: true,
                    reason: t('niche-1-reason-4'),
                    explanation: t('niche-1-explanation-4'),
                },
            ],
        },
        {
            title: t('niche-2-title'),
            items: [
                {
                    icon: <ion-icon name="close-outline"></ion-icon>,
                    isPositive: false,
                    reason: t('niche-2-reason-1'),
                    explanation: t('niche-2-explanation-1'),
                },
                {
                    icon: <ion-icon name="close-outline"></ion-icon>,
                    isPositive: false,
                    reason: t('niche-2-reason-2'),
                    explanation: t('niche-2-explanation-2'),
                },
                {
                    icon: <ion-icon name="close-outline"></ion-icon>,
                    isPositive: false,
                    reason: t('niche-2-reason-3'),
                    explanation: t('niche-2-explanation-3'),
                },
                {
                    icon: <ion-icon name="close-outline"></ion-icon>,
                    isPositive: false,
                    reason: t('niche-2-reason-4'),
                    explanation: t('niche-2-explanation-4'),
                },
            ],
        },
    ];

    const features = [
        {
            title: t('feature-1-title'),
            description: t('feature-1-description'),
            image: <ion-icon name="moon-outline"></ion-icon>
        },
        {
            title: t('feature-2-title'),
            description: t('feature-2-description'),
            image: <ion-icon name="calendar-outline"></ion-icon>,
        },
        {
            title: t('feature-3-title'),
            description: t('feature-3-description'),
            image: <ion-icon name="checkmark-circle-outline"></ion-icon>,
        },
        {
            title: t('feature-4-title'),
            description: t('feature-4-description'),
            image: <ion-icon name="heart-outline"></ion-icon>,
        },
        {
            title: t('feature-5-title'),
            description: t('feature-5-description'),
            image: <ion-icon name="rocket-outline"></ion-icon>,
        },
        {
            title: t('feature-6-title'),
            description: t('feature-6-description'),
            image: <ion-icon name="bonfire-outline"></ion-icon>,
        },
        {
            title: t('feature-7-title'),
            description: t('feature-7-description'),
            image: <ion-icon name="finger-print-outline"></ion-icon>,
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

    const testimonials = [
        // TODO traducir
        {
            avatar: "/images/testimonials/testimonial-1.jpeg",
            text: "Durante mucho tiempo, quise ganar /masa muscular/, pero no sabía por dónde empezar. Afortunadamente, un amigo con experiencia en el tema me guió en cada paso. Me explicó los /fundamentos/ de la hipertrofia: desde cómo estructurar mis entrenamientos y ajustar las series y repeticiones, hasta cómo enfocarme en el principio de \“una repetición más\”.",
            authorName: "Jose Miguel",
            authorTitle: "Más de 1 año de consistencia",
        },
        {
            avatar: "/images/testimonials/testimonial-2.jpeg",
            text: "Ahora sigo una rutina completa que incluye tanto ejercicios básicos como específicos para cada grupo muscular, y que me reta constantemente. Estoy muy /agradecido/ de tener a alguien que me haya mostrado el camino de forma tan práctica y motivadora.",
            authorName: "Juan Antonio",
            authorTitle: "Superando metas",
        },
    ];

    return (
        <div className="landing">
            <NavHorizontal
                linkText1={t('nav-landing-1')}
                linkText2={t('nav-landing-2')}
                linkText3={t('nav-landing-3')}
                linkText4={t('nav-landing-4')}
                currentLanguage={language}
                loginText={t('nav-landing-login')}
                signUpText={t('nav-landing-signup')}
                cbChangeLanguage={changeLanguage} />
            <HeroSection />

            <BenefitsSection
                sectionTitle={t('benefits-section-title')}
                benefits={benefits} />

            <NicheSection
                sectionTitle={t('niche-section-title')}
                nicheDescription={nicheDescription}
            />

            <FeatureSection
                sectionTitle={t('features-section-title')}
                features={features}
            />

            <TestimonialsSection
                sectionTitle={"CAMBIAR Y TRADUCIR"}
                testimonials={testimonials}
            />
        </div>
    );
};

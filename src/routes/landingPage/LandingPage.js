import NavHorizontal from "../../components/nav/Nav";
import TranslatedNavHorizontal from "../../components/nav/TranslatedNav";
import HeroSection from "../../components/heroSection/HeroSection";
import NicheSection from "../../components/nicheSection/NicheSection";
import BenefitsSection from "../../components/benefitsSection/BenefitsSection";
import FeatureSection from "../../components/featureSection/FeatureSection";
import TestimonialsSection from "../../components/testimonialsSection/TestimonialsSection";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { scroller } from 'react-scroll';
import { useTranslation } from "react-i18next";

export default function LandingPage() {
    const location = useLocation();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (location.hash) {
            scroller.scrollTo(location.hash.substring(1), {
                smooth: true,
                duration: 500,
                offset: -0, // adjust for any fixed headers if needed
            });
        }
    }, [location]);

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
        {
            avatar: "/images/testimonials/testimonial-1.jpeg",
            text: t('testimonial-1-text'),
            authorName: "Jose Miguel",
            authorTitle: t('testimonial-1-author-title'),
        },
        {
            avatar: "/images/testimonials/testimonial-2.jpeg",
            text: t('testimonial-2-text'),
            authorName: "Juan Manuel",
            authorTitle: t('testimonial-2-author-title'),
        },
    ];

    return (
        <div className="landing">
            <TranslatedNavHorizontal
                currentLocation={location.pathname}
            />

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
                sectionTitle={t('testimonials-section-title')}
                testimonials={testimonials}
            />
        </div>
    );
};

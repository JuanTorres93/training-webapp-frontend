import HeroSection from "../../components/heroSection/HeroSection";
import LastCTA from "../../components/lastCTA/LastCTA";
import CompetitiveAdvantage from "../../components/competitiveAdvantage/CompetitiveAdvantage";

import styles from "./LandingPage.module.css";

import { useTranslation } from "react-i18next";

export default function LandingPage() {
    const { t, i18n } = useTranslation();

    // TODO mover a navbar
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const competitiveAdvantages = [
        {
            image: "/images/CTA1.png",
            title: t('feature-1-title'),
            description: "Trackoverload transforms home workouts with efficient progress tracking - helping you stay motivated and excel at your fitness journey, effortlessly and at no cost.",
            reverse: false,
        },
        {
            image: "/images/CTA2.png",
            title: "Visualize every victory with progress-tracking graphs",
            description: "Trackoverload turns your effort into vivid graphs, fueling your motivation by showcasing every improvement, no matter how small, with clear visuals right at home.",
            reverse: true,
        },
        {
            image: "/images/CTA3.png",
            title: "Progressive exercise tracking",
            description: "Unleash your fitness potential from the comfort of your home with Trackoverload's Progressive Exercise Tracking, designed to give you clear visibility of your gains over time, propelling constant self-motivation and fostering continuous personal improvement - all accessible within a seamless, user-friendly interface.",
            reverse: false,
        },
    ];
    return (
        // <PagePresenter showBackButton={false} children={
        <div className={styles.mainContainer}>
            <HeroSection />
            {/* <CTA /> */}
            {competitiveAdvantages.map((ca, index) => (
                <CompetitiveAdvantage
                    key={index}
                    image={ca.image}
                    title={ca.title}
                    description={ca.description}
                    reverse={ca.reverse}
                />
            ))}
            <LastCTA />
        </div>
        // } />
    );
};

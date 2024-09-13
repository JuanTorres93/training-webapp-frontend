import PagePresenter from "../../components/pagePresenter/PagePresenter";
import HeroSection from "../../components/heroSection/HeroSection";
import LastCTA from "../../components/lastCTA/lastCTA";
import CompetitiveAdvantage from "../../components/competitiveAdvantage/CompetitiveAdvantage";
import CTA from "../../components/cta/CTA";

const competitiveAdvantages = [
    {
        image: "/images/CTA1.png",
        title: "Streamline your fitness journey right from home",
        description: "Trackoverload transforms home workouts with efficient progress tracking - helping you stay motivated and excel at your fitness journey, effortlessly and at no cost.",
        reverse: false,
    },
    {
        image: "/images/CTA1.png",
        title: "Visualize every victory with progress-tracking graphs",
        description: "Trackoverload turns your effort into vivid graphs, fueling your motivation by showcasing every improvement, no matter how small, with clear visuals right at home.",
        reverse: true,
    },
    {
        image: "/images/CTA1.png",
        title: "Progressive exercise tracking",
        description: "Unleash your fitness potential from the comfort of your home with Trackoverload's Progressive Exercise Tracking, designed to give you clear visibility of your gains over time, propelling constant self-motivation and fostering continuous personal improvement - all accessible within a seamless, user-friendly interface.",
        reverse: false,
    },
];

export default function LandingPage() {
    return (
        // <PagePresenter showBackButton={false} children={
        <div>
            <HeroSection />
            <CTA />
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

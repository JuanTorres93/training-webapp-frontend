import PagePresenter from "../../components/pagePresenter/PagePresenter";
import HeroSection from "../../components/heroSection/HeroSection";
import LastCTA from "../../components/lastCTA/lastCTA";
import CompetitiveAdvantage from "../../components/competitiveAdvantage/competitiveAdvantage";


export default function LandingPage() {
    return (
        <PagePresenter showBackButton={false} children={
            <div>
                <HeroSection />
                <CompetitiveAdvantage />
                <LastCTA />
            </div>
        } />
    );
};

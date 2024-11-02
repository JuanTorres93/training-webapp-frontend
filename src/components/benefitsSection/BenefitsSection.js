function BenefitsSection({
    benefits
}) {
    return (
        <section id='benefits' className="benefits">
            {/* TODO include an h2 heading */}
            <div className="benefit">
                <div className="benefit__shape benefit__shape--start">
                    <div className="benefit__title">
                        Train
                    </div>

                    <ul className="benefit__list">
                        <li className="benefit__item">
                            item
                        </li>
                    </ul>
                </div>
            </div>

            <div className="benefit">
                <div className="benefit__shape benefit__shape--middle">
                    <div className="benefit__title">
                        Track
                    </div>

                    <ul className="benefit__list">
                        <li className="benefit__item">
                            item
                        </li>
                    </ul>
                </div>
            </div>

            <div className="benefit">
                <div className="benefit__shape benefit__shape--middle">
                    <div className="benefit__title benefit__front-side">
                        Improve
                    </div>

                    <ul className="benefit__list benefit__back-side">
                        <li className="benefit__item">
                            item
                        </li>
                    </ul>
                </div>
            </div>
            <div className="benefit">
                <div className="benefit__shape benefit__shape--end">
                    <div className="benefit__title">
                        Enjoy
                    </div>

                    <ul className="benefit__list">
                        <li className="benefit__item">
                            item
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;

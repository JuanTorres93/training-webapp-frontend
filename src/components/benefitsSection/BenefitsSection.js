function BenefitsSection({
    benefits
}) {
    return (
        <section id='benefits' className="benefits">
            {/* TODO include an h2 heading */}
            <div className="benefit">
                <div className="benefit__shape benefit__shape--start benefit__front-side">
                    <div className="benefit__title">
                        Train
                    </div>
                </div>

                <div className="benefit__shape benefit__shape--start benefit__back-side">
                    <ul className="benefit__list">
                        <li className="benefit__item">
                            item
                        </li>
                    </ul>
                </div>
            </div>

            <div className="benefit">
                <div className="benefit__shape benefit__shape--middle benefit__front-side">
                    <div className="benefit__title">
                        Track
                    </div>
                </div>

                <div className="benefit__shape benefit__shape--middle benefit__back-side">
                    <ul className="benefit__list">
                        <li className="benefit__item">
                            item
                        </li>
                    </ul>
                </div>
            </div>

            <div className="benefit">
                <div className="benefit__shape benefit__shape--middle benefit__front-side">
                    <div className="benefit__title">
                        Improve
                    </div>
                </div>

                <div className="benefit__shape benefit__shape--middle benefit__back-side">
                    <ul className="benefit__list">
                        <li className="benefit__item">
                            item
                        </li>
                    </ul>
                </div>
            </div>


            <div className="benefit">
                <div className="benefit__shape benefit__shape--end benefit__front-side">
                    <div className="benefit__title">
                        Enjoy
                    </div>
                </div>

                <div className="benefit__shape benefit__shape--end benefit__back-side">
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

function NicheSection({
    sectionTitle, // string
    nicheDescription // object with title and items: [{icon, isPositive, reason, explanation}] object properties
}) {
    return (
        <section id='niche-section' className="niche-section">

            <h2 className="niche-section__heading heading-secondary u-margin-bottom-large">
                {sectionTitle}
            </h2>

            {
                nicheDescription.map((nd, index) => {
                    return (
                        <div className="niche-msg" key={index}>
                            <h3 className="heading-tertiary u-center-text niche-msg__title">
                                {nd.title}
                            </h3>

                            <div className="niche-msg__list">
                                {
                                    nd.items.map((item, index) => {
                                        return (
                                            <div className="niche-msg__item" key={index}>
                                                <div className="niche-msg__reason">
                                                    <div className={`niche-msg__icon-box niche-msg__icon-box--${item.isPositive ? 'green' : 'red'}`}>
                                                        {item.icon}
                                                    </div>
                                                    <p>{item.reason}</p>
                                                </div>

                                                <div className="niche-msg__explanation">
                                                    <p>{item.explanation}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                }

                            </div>

                        </div>
                    );
                })
            }
        </section>
    );
};

export default NicheSection;

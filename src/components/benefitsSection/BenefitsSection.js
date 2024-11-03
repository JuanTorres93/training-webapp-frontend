function BenefitsSection({
    benefits = [] // Ordered array of objects with title, items and cta properties
}) {
    return (
        <section id='benefits' className="benefits">
            {/* TODO include an h2 heading */}

            {
                benefits.map((benefit, index) => {
                    const items = benefit.items.split(';');
                    return (
                        <div className="benefit" key={index}>
                            <div className={`benefit__shape benefit__shape--${index + 1} benefit__shape--${index === 0 ? 'start' : index === benefits.length - 1 ? 'end' : 'middle'} benefit__front-side`}>
                                <div className="benefit__title">
                                    {benefit.title}
                                </div>
                            </div>

                            <div className={`benefit__shape benefit__shape--${index + 1} benefit__shape--${index === 0 ? 'start' : index === benefits.length - 1 ? 'end' : 'middle'} benefit__back-side`}>
                                <figure className="benefit__icon-box">
                                    <img src="" alt="" className="benefit__icon" />
                                </figure>
                                <ul className="benefit__list">
                                    {
                                        items.map((item, index) => (
                                            <li key={index} className="benefit__item">
                                                {item}
                                            </li>
                                        ))
                                    }
                                </ul>

                                <button className="benefit__cta simple-btn simple-btn--no-border">
                                    {benefit.cta}
                                </button>
                            </div>
                        </div>
                    );
                })
            }
        </section>
    );
};

export default BenefitsSection;

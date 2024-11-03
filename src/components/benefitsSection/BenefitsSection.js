function BenefitsSection({
    benefits = [] // Ordered array of objects with title, items and cta properties
}) {
    return (
        <section id='benefits' className="benefits">
            {/* TODO include an h2 heading */}

            {
                benefits.map((benefit, index) => {
                    return (
                        <div className="benefit" key={index}>
                            <div className={`benefit__shape benefit__shape--${index + 1} benefit__shape--${index === 0 ? 'start' : index === benefits.length - 1 ? 'end' : 'middle'} benefit__front-side`}>
                                <div className="benefit__title">
                                    {benefit.title}
                                </div>
                            </div>

                            <div className={`benefit__shape benefit__shape--${index + 1} benefit__shape--${index === 0 ? 'start' : index === benefits.length - 1 ? 'end' : 'middle'} benefit__back-side`}>
                                <ul className="benefit__list">
                                    {
                                        // TODO MODIFICAR CUANDO SEPA CÓMO GESTIONAR LOS ITEMS
                                        // SEGURAMENTE IRÁN SEPARADOS POR PUNTO Y COMA EN EL JSON DE TRADUCCIONES
                                        <li className="benefit__item" key={index}>
                                            {benefit.items}
                                        </li>
                                    }
                                </ul>
                            </div>

                            {/* TODO include CTA */}
                        </div>
                    );
                })
            }
        </section>
    );
};

export default BenefitsSection;

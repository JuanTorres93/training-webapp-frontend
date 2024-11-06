function FeatureSection({
    sectionTitle, // string
    features // array of objects with title, description and image (for now, it is an ion-icon component)
}) {
    return (
        <section id='features' className="features">
            <h2 className="features__heading heading-secondary u-margin-bottom-large">
                {sectionTitle}
            </h2>
            {
                features.map(f => {
                    return (
                        <div key={f.title} className="feature__card">
                            <figure className="feature__icon-box">
                                {/* <img src={f.image} alt="feature icon" className="feature__icon" /> */}
                                {f.image}
                            </figure>

                            <div className="feature__title">
                                {f.title}
                            </div>

                            <div className="feature__text">
                                {f.description}
                            </div>
                        </div>
                    );
                })
            }
        </section>
    );
};

export default FeatureSection;

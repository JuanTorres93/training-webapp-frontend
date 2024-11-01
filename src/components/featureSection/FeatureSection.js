function FeatureSection({
    features // array of objects with title, description and image
}) {
    return (
        <section id='features' className="features">
            {/* TODO include an h2 heading */}
            {
                features.map(f => {
                    return (
                        <div key={f.title} className="feature__card">
                            <figure className="feature__icon-box">
                                {/* TODO sprite svg */}
                                <img src={f.image} alt="feature icon" className="feature__icon" />
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

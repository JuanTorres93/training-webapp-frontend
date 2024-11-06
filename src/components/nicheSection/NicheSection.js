function NicheSection({
    sectionTitle, // string
    messages // object with title and text properties
}) {
    return (
        <section id='niche-section' className="niche-section">
            {/* Video de fondo */}
            <h2 className="niche-section__heading heading-secondary u-margin-bottom-large">
                {sectionTitle}
            </h2>

            {
                messages.map((message, index) => {
                    return (
                        <div className="niche-msg" key={index}>
                            <h3 className="niche-msg__title">
                                {message.title}
                            </h3>

                            <div className="niche-msg__text">
                                {message.text}
                            </div>
                        </div>
                    );
                })
            }
        </section>
    );
};

export default NicheSection;

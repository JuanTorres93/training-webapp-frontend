function TestimonialsSection({
    sectionTitle, // string
    testimonials // List of objects with the following properties: avatar, text, authorName, authorTitle
}) {
    return (
        <section id='testimonials-section' className="testimonials-section">

            <h2 className="testimonials-section__heading heading-secondary u-margin-bottom-large">
                {sectionTitle}
            </h2>

            {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial">
                    <figure className="testimonial__icon-box">
                        <ion-icon name="flash-outline"></ion-icon>
                    </figure>

                    <figure className="testimonial__avatar-box">
                        <img src={testimonial.avatar} alt="" className="testimonial__avatar" />
                    </figure>

                    <div className="testimonial__text-box">
                        <p className="testimonial__text">
                            {testimonial.text}
                        </p>

                    </div>

                    <div className="testimonial__author-box">
                        <span className="testimonial__author-name">
                            {testimonial.authorName}
                        </span>
                        <span className="testimonial__author-title">
                            {testimonial.authorTitle}
                        </span>
                    </div>
                </div>
            ))}

        </section>
    );
};

export default TestimonialsSection;

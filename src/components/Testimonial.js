import React from 'react'

import './Testimonial.css'

export default (props) => (
    <div className="testimonial taCenter lg:mt-3">
        <h2 className="h1 taCenter">Testimonial</h2>

        <article className="testimonial-content">
            <ul className="no-list">{
                props.quote.map((quote) =>
                    <li key={quote.quoted}>
                        {quote.testimonials}
                        <cite className="testimonial--quoter">
                            {quote.quoted}
                        </cite>
                    </li>
                )}
            </ul>
        </article>
    

    </div>
)
import React from 'react'

import './Clients.css'

export default (props) => (
    <div className="clients taCenter">
        <h2 className="h2">Clients</h2>

        <article className="client-content">
            <ul className="no-list">{
                props.client.map((client) =>
                    // <li key={quote.quoted}>
                    //     {quote.testimonials}

                    // </li>
                )}
            </ul>
        </article>
    

    </div>
)
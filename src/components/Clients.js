import React from 'react'

import './Clients.css'

import Img from './Img'

export default (props) => (
    <div className="clients taCenter lg:mt-1">
        <h2 className="h2 taCenter">Clients</h2>

        <article className="client-content">
            <ul className="no-list client-list">{
                props.client.map((client) =>
                    <li 
                        className="client-list--item"
                        key={client.logo}>
  
                        <Img
                        
                        src={client.logo}
                        alt={client.logo} 

                        />
                    </li>
                )}
            </ul>
        </article>
    

    </div>
)
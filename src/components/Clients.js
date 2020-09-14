import React from 'react'
import styled from '@emotion/styled'

import './Clients.css'

const ClientLogo = styled.div`
    background: ${client => `url(${client.logo}) no-repeat top center`};
    background-size: cover;
    position: relative;
`

export default (props) => (
   
    <div className="clients taCenter lg:mt-1">
        <h2 className="h2 taCenter">Clients</h2>

        <article className="client-content">
            <ul className="no-list client-list">{
                props.client.map((client) =>
                    <li 
                        className="client-list--item aspect-ratio ratio--100"
                        key={client.logo}>
                        <div 
                            className="bg-img ratio--inner"
                            style={{backgroundImage:'url('+client.logo+')'}}
                        
                        >
                            
                        </div>

                    </li>
                )}
            </ul>
        </article>
    

    </div>
)
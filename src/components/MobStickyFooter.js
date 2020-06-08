import React from 'react'
// import InstagramFeed from './InstagramFeed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

import './MobStickyFooter.css'
import { Instagram } from 'react-feather'

//<InstagramFeed count="8" />
export default () => (
  <div>
    <footer className="footer mob--footer">
      <div className="container taCenter">
        <ul className="no-list social-list social-list--footer">
            <li>
                <FontAwesomeIcon icon={faInstagram} />
            </li>
            <li>
            <FontAwesomeIcon icon={faEnvelope} />
            </li>
        </ul>
      </div>
    </footer>
  </div>
)

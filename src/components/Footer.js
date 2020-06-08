import React from 'react'
// import InstagramFeed from './InstagramFeed'
import './Footer.css'

//<InstagramFeed count="8" />
export default () => (
  <div>
    <h2 className="taCenter">
      Follow us{' '}
      <a href="https://instagram.com/whoamalone/">@whoamalone</a>
    </h2>
    <br />
    
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} JMP. All rights reserved. Crafted by <a href="https://andrewbe.me" target="_blank">andrewbeme</a>
        </span>
      </div>
    </footer>
  </div>
)

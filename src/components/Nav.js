import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import Logo from './Logo'
import NavLogo from './NavLogo'

import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  render() {
    const { active } = this.state,
      { subNav } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <div class="nav-layout">
        <div className={`Nav ${active ? 'Nav-active' : ''} nav-cont`}>
          <div class="bg-w"></div>
          <div class="inner-cont">
            <div class="logo-w">
              <Link to="/" onClick={this.handleLinkClick}>
                {active ? <NavLogo /> : <Logo />}
              </Link>
            </div>
            <div class="inner-cont-w">
              <div class="container">
                <div class="row row-align-btween">
                  <nav class="lg:gr-5 gr-12">
                    
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/components/">Components</NavLink>
                        <NavLink to="/gallery/">Gallery</NavLink>
                        <div
                          className={`Nav--Group ${
                            this.state.activeSubNav === 'posts' ? 'active' : ''
                          }`}
                        >
                          <span
                            className={`NavLink Nav--GroupParent ${
                              this.props.location.pathname.includes('posts') ||
                              this.props.location.pathname.includes('blog') ||
                              this.props.location.pathname.includes('post-categories')
                                ? 'active'
                                : ''
                            }`}
                            onClick={() => this.toggleSubNav('posts')}
                          >
                            Blog
                            <div className="Nav--GroupLinks">
                              <NavLink to="/blog/" className="Nav--GroupLink">
                                All Posts
                              </NavLink>
                              {subNav.posts.map((link, index) => (
                                <NavLink
                                  to={link.slug}
                                  key={'posts-subnav-link-' + index}
                                  className="Nav--GroupLink"
                                >
                                  {link.title}
                                </NavLink>
                              ))}
                            </div>
                          </span>
                        </div>
                        <NavLink to="/default/">Default</NavLink>
                        <NavLink to="/contact/">Contact</NavLink>
                      

                    
                  </nav>
                  <div className="lg:gr-4 gr-12 contact">
                  
                  </div>
                </div>
              </div>
            </div>
            <div className="line-w">
              <div className="line-inner-w">
                <div className="line"></div>
              </div>
            </div>
          </div>
        
        </div>
        <div class="nav-btn-cont">
          <button
          className={`Button-blank Nav--MenuButton hamburger ${active ? 'is-active' : ''}`}
          type="button"
          onClick={this.handleMenuToggle}
          >
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
          <div class="nav-btn-bg"></div>
        </div>
      </div>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)

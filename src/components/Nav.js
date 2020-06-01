import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'

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
        <div class="nav-cont">
          <div class="bg-w"></div>
          <div clas="inner-cont">
            <div class="logo-w"></div>
            <div class="inner-cont-w">
              <div class="container">
                <div class="row">
                  <nav className={`Nav ${active ? 'Nav-active' : ''} lg:gr-5 gr-12`}>
                    <div className="Nav--Container container">
                      <Link to="/" onClick={this.handleLinkClick}>
                        <Logo />
                      </Link>
                      <div className="Nav--Links">
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
                      </div>

                    </div>
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
          className="Button-blank Nav--MenuButton"
          onClick={this.handleMenuToggle}
          >
          {active ? <X /> : <Menu />}
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

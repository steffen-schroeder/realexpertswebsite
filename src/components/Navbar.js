import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/realexperts-textual.svg'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleClass= this.toggleClass.bind(this);
    this.state = {
      mobileMenuActive: false,
    };
  }
  toggleClass(newState) {
    this.setState({ mobileMenuActive: !this.state.mobileMenuActive });
  };

  render() {
    return (
      <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image">
                <img src={logo} alt="Real Experts"/>
              </figure>
            </Link>
            <a role="button"
               className="navbar-burger"
               aria-label="menu"
               aria-expanded="false"
               onClick={this.toggleClass}>
              <span aria-hidden="true"></span> <span aria-hidden="true"></span> <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.mobileMenuActive ? 'is-active': 'not-active'}`}>
            <div className="navbar-start"> </div>
            <div className="navbar-end">
              <Link className="navbar-item"
                    activeClassName="is-active"
                    onClick={this.toggleClass}
                    to="/"> Start </Link>
              <Link className="navbar-item"
                    activeClassName="is-active"
                    onClick={this.toggleClass}
                    to="/blog"> Blog </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar

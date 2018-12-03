import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/realexperts-textual.svg'
import menu from '../img/icons/menu.svg'

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
      <nav role="navigation" aria-label="main navigation">
        <Link to="/" className="navigation-bar-logo">
          <figure className="image">
            <img src={logo} alt="Real Experts GmbH"/>
          </figure>
        </Link>
        <img role="button"
             src={menu}
           className="navigation-bar-burger"
           aria-label="menu"
           aria-expanded="false"
           onClick={this.toggleClass}>
        </img>
        <div className={`navigation-bar-menu ${this.state.mobileMenuActive ? 'is-active': 'not-active'}`}>
          <Link className="navigation-bar-item"
                activeClassName="is-active"
                onClick={this.toggleClass}
                to="/"> Start </Link>
          <Link className="navigation-bar-item"
                activeClassName="is-active"
                onClick={this.toggleClass}
                to="/blog"> Blog </Link>
        </div>
      </nav>
    )
  }
}

export default Navbar

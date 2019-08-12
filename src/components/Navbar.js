import React from 'react';
import { Link } from 'gatsby';

import logo from '../img/realexperts-bildmarke.svg';
import menu from '../img/icons/menu.svg';
import { useMainMenu } from '../hooks/use-main-menu';

class NavbarComponent extends React.Component {

  constructor(props) {
    super(props);
    this.toggleClass= this.toggleClass.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      mobileMenuActive: false,
      menuItems: props.children,
      scrolling: false,
    };
  }
  toggleClass(newState) {
    this.setState({ mobileMenuActive: !this.state.mobileMenuActive });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll(event) {
    if (window.scrollY === 0 && this.state.scrolling === true) {
      this.setState({scrolling: false});
    }
    else if (window.scrollY !== 0 && this.state.scrolling !== true) {
      this.setState({scrolling: true});
    }
  };


  render() {
    return (
      <div className={this.state.scrolling ? 'navbar-wrapper navbar-scrolled' : 'navbar-wrapper navbar-at-top'}>
        <nav role="navigation" aria-label="main navigation">
          <Link to="/" className="navigation-bar-logo">
            <figure className="image-top">
              <img src={logo} alt="Real Experts GmbH"/>
            </figure>
          </Link>
          <img role="button"
               src={menu}
               alt=""
               className="navigation-bar-burger"
               aria-label="menu"
               aria-expanded="false"
               onClick={this.toggleClass}>
          </img>
          <div className={`navigation-bar-menu ${this.state.mobileMenuActive ? 'is-active': 'not-active'}`}>
            {this.state.menuItems}
          </div>
        </nav>
      </div>
    )
  }
}

const Navbar = () => {

  const {
    settings,
  } = useMainMenu();

  const menuItems = settings.mainMenu.map((item, key) => {
    return (
      <Link to={item.url}
            key={key}
            className="navigation-bar-item"
            activeClassName="is-active">{item.title}
      </Link>
    );
  });

  return(
    <NavbarComponent children={menuItems}/>
  )

};

export default Navbar


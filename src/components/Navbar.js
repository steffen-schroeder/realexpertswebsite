import React from 'react';
import { Link } from 'gatsby';

import logo from '../img/realexperts-bildmarke.svg';
import menu from '../img/icons/menu.svg';
import { useMainMenu } from '../hooks/use-main-menu';

class NavbarComponent extends React.Component {

  constructor(props) {
    super(props);
    this.toggleClass= this.toggleClass.bind(this);

    this.state = {
      mobileMenuActive: false,
      menuItems: props.children
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
    )
  }
}

const Navbar = () => {

  const {
    settings,
    slugs,
  } = useMainMenu();

  const menuItems = settings.mainMenu.map((item, key) => {
    let link = '/';
    if (item.url) {
      link = item.url;
    } else {
      const edge = slugs.edges.find((slugItem) => {
        return slugItem.node.frontmatter.title === item.link;
      });

      if (edge) {
        link = edge.node.fields.slug;
      }
    }

    return (
      <Link to={link}
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


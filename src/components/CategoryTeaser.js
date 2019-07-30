import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "gatsby"
import Img from 'gatsby-image';

export default class CategoryTeaser extends React.Component {

  render() {
    const category = this.props.category;

    return (
      <div className="category-teaser">
        <div>
          {category.fields.thumbnail &&
          <Link to={category.fields.slug}>
            <Img fluid={category.fields.thumbnail.childImageSharp.fluid}/>
          </Link>}
        </div>
        <Link to={category.fields.slug}>
          <h4>{category.frontmatter.title}</h4>
        </Link>
      </div>
    )
  }
}

CategoryTeaser.propTypes = {
  category: PropTypes.shape({
    fields: PropTypes.shape({
      thumbnail: PropTypes.object,
      slug: PropTypes.string,
    }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

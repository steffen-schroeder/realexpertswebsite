import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import arrow from "../img/icons/arrow-right.svg";
export default class BlogPostTeaser extends React.Component {

  render() {
    const post = this.props.post;
    const type = this.props.type || 'normal';

    return (
      <div className={`post ${type}`}>
        <div className={`image-type-${type}`}>
          { post.fields.image && <Img sizes={post.fields.image.childImageSharp.sizes} /> }
        </div>
        <div className="post-content">
          <ul className='taglist divided'>
            {post.frontmatter.tags.map((tag, key) => (
              <li key={key}>
                <Link to={`/tags/${tag}`}>{tag}</Link>
              </li>
            ))}
          </ul>
          {/*<small>{post.frontmatter.date}</small>*/}
          <Link to={post.fields.slug}>
            <h4>{post.frontmatter.title}</h4>
          </Link>
          <p className='post-content-excerpt'>{post.excerpt}</p>
          { type === 'featured'
          && <Link className="more" to={post.fields.slug}>Artikel lesen<img className="arrow" src={arrow} alt=""/></Link> }

        </div>
      </div>
    )
  }
}

BlogPostTeaser.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({
      image: PropTypes.object,
      slug: PropTypes.string,
    }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.string,
    }),
  }),
  type: PropTypes.oneOf(['normal', 'featured', 'top', 'related']),
};
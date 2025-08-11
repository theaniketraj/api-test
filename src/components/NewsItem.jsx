import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    const { title, description, imageurl, newsurl, author, date, source } = this.props;
    const defaultImage =
      'https://image.cnbcfm.com/api/v1/image/108180875-1754268747711-gettyimages-2218498648-byd-1.jpeg?v=1754268891&w=1920&h=1080';

    return (
      <div className="my-3">
        <div className="card h-100">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: '90%', zIndex: '1' }}
          >
            {source}
          </span>
          <img
            src={imageurl || defaultImage}
            className="card-img-top"
            alt="News"
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description || 'No description available.'}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author || 'Unknown'} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-dark mt-auto"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      progress: 0,
    };
  }

  componentDidMount() {
    this.updateTitle();
    this.fetchNews(this.state.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.updateTitle();
      this.setState({ articles: [], page: 1 }, () => {
        this.fetchNews(1);
      });
    }
  }

  updateTitle = () => {
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
  };

  fetchNews = async (page) => {
    if (this.state.loading) return;

    this.setState({ loading: true });
    this.loadingBar?.continuousStart();

    const { country, category, pageSize } = this.props;
    const apiKey = '8976d1259f544a53853526e7b64bca53';
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      this.setState((prevState) => ({
        articles: [...prevState.articles, ...(data.articles || [])],
        totalResults: data.totalResults || 0,
        loading: false,
        page,
      }));

    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false });
    } finally {
      this.loadingBar?.complete();
    }
  };

  fetchMoreData = () => {
    this.fetchNews(this.state.page + 1);
  };

  render() {
    const { articles, totalResults } = this.state;

    return (
      <div className="container my-4">
        <LoadingBar color="#ff0000" ref={(ref) => (this.loadingBar = ref)} />

        <h1 className="text-center" style={{ margin: '30px 0px' }}>
          NewsMonkey - Top Headlines from {this.capitalize(this.props.category)}
        </h1>

        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="row my-4">
            {articles.map((element, index) => (
              <div className="col-md-4" key={element.url || index}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source?.name}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
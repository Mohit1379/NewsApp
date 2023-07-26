import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  document.title = `${capitalizeFirstLetter(props.category)} : NewsMonkey`;

  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e8caf87d1fe44167ac150d9c7ebc8ba9&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, []);
  // handlePreClick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e8caf87d1fe44167ac150d9c7ebc8ba9&page=${state.page - 1}&pageSize=${props.pageSize}`;
  //   // setState({loading: true})
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // setState({
  //   //   articles: parsedData.articles,
  //   //   page: state.page - 1,
  //   //   loading:false
  //   // });
  //  await setState({page: state.page -1})
  //   updateNews();
  // };

  // handleNextClick = async () => {
  //   // if(!(state.page + 1 > Math.ceil(state.totalResults/props.pageSize)))
  //   // {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e8caf87d1fe44167ac150d9c7ebc8ba9&page=${state.page + 1}&pageSize=${props.pageSize}`;
  //   //   setState({loading: true})
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   setState({
  //   //     articles: parsedData.articles,
  //   //     page: state.page + 1,
  //   //     loading:false
  //   //   });
  //   // }
  //   await setState({page : state.page + 1});
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e8caf87d1fe44167ac150d9c7ebc8ba9&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    const newArticles = parsedData.articles.map((element) => {
      return {
        ...element,
        key: element.url, // Assign a unique key to each new article
      };
    });
    setArticles(articles.concat(newArticles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  }
    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px" }}>
          NewMonkey - Top {capitalizeFirstLetter(props.category)} Headlines{" "}
        </h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element, index) => {
                return (
                  <div className="col-md-4 my-3" key={index}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button disabled={state.page <= 1} onClick={handlePreClick} type="button" className="btn btn-dark">&larr; Previous</button>
          <button disabled={state.page + 1 > Math.ceil(state.totalResults/props.pageSize)} onClick={handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
        </div> */}
      </>
    );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
  totalResults: 0,
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

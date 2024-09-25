import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem'
import axios from 'axios';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default function News(props) {

    // const fetchData = async (pagenumber) => {
    //   try {
    //     let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=54a193a1e5c0435b9bfe6dff5a8f8149&page=${pagenumber}`
    //     const response = await axios.get(url);
    //     setarticle({
    //       articles: response.data.articles, 
    //       loading: false
    //     });
    //   } catch (error) {
    //     console.log(error)
    //   }
    // };

  const [article, setarticle] = useState({
    articles: [],
    loading: false,
    totalResult: 1
  });

  const [page, setPage] = useState(1);

  const { country, category, apiKey, pageSize, setLoadingstate } = props;

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);  // No slice here
  }

  const handlePreviousClick = async () => {
    setPage(page - 1)
    // fetchData(page)
  }

  const handleNextClick = async () => {

      setPage(page + 1)
      // fetchData(page)

  }

//   Small Projects or Simple Pagination: Calling the API directly in the button handlers is fine and can be slightly simpler.
// Best Practice, Maintainability, and Future-proofing: Using useEffect with a dependency on the page state is more scalable and maintainable, especially as your component grows in complexity.

useEffect(() => {
  setLoadingstate(30); 
  const fetchData = async () => {
    try {
      setarticle(prevState => ({ ...prevState, loading: true }))
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      const response = await axios.get(url);
      setarticle({
        articles: response.data.articles, 
        loading: false,
        totalResult: response.data.totalResults
      });
      setLoadingstate(100);
    } catch (error) {
      console.log(error);
      setarticle(prevState => ({ ...prevState, loading: false }));
      setLoadingstate(100); // Complete the progress even if there's an error
    }
  };

  fetchData();
}, [page, apiKey, pageSize, country, category]);


    return (
        <div className='container my-3'>
        <h1 className='text-center mb-3'style={{ marginTop: '90px' }}>NewsMonkey - Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
        <div className="row">
        {/* This can also be used instead of if else for loading spinner */}
        {/* If loading if true show spinner */}
        {article.loading && <Spinner />}
        {/* If loading is false the show the content */}
        {/* Same thing could also be achived ny just using if else */}
        {!article.loading && article.articles.map((element) => {
          return <div className='col-md-4' key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):''} description= {element.description?element.description.slice(0,88):''} imageUrl={element.urlToImage} 
            newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(article.totalResult / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div>
    </div>
  )
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};
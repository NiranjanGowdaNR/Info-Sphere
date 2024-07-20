import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function SearchNews() {
  const { query } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  let pageSize = 12;

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/search/msg?msg=${query}&page=${page}&pageSize=${pageSize}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(myJson => {
        setTotalResults(myJson.data.totalResults);
        setData(myJson.data.articles);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [query, page]);

  return (
    <>
      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {isLoading ? <Loader /> : data.map((element, index) => {
          return <EverythingCard
            title={element.title} description={element.description} imgUrl={element.urlToImage}
            publishedAt={element.publishedAt} url={element.url} author={element.author}
            source={element.source.name} key={index}
          />
        })}
      </div>
      {!isLoading && <div className="pagination flex justify-center gap-14 my-10 items-center">
        <button disabled={page <= 1} className='pagination-btn text-center' onClick={() => handlePrev()}>&larr; Prev</button>
        <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / 15)}</p>
        <button className='pagination-btn text-center' disabled={page > Math.ceil(totalResults / 15)} onClick={() => handleNext()}>Next &rarr;</button>
      </div>}
    </>
  );
}

export default SearchNews;

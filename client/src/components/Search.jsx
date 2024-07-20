import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');

  function handleClick(e) {
  
    let usermsg = inputValue.split(" ").join("&");
    setQuery(usermsg);
  }

  return (
    <form className='search-bar my-0 text-center px-0 xs:mb-6 md:mb-4'>
      <input
        type="text"
        name='search'
        className="search-box md:w-2/4 sm:p-4 xs:px-1"
        placeholder='Search News'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type='button' className='btn' onClick={handleClick}>
        <Link to={`/search/${query}`} className="flex gap-3 capitalize">
          Search
        </Link>
      </button>
    </form>
  );
}

export default Search;

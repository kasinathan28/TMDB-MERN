import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Search() {
  const { query: urlQuery } = useParams();
  const [query, setQuery] = useState(urlQuery || ''); // Initialize with the URL query parameter
  const [results, setResults] = useState([]);
  const BASEURL = `${process.env.REACT_APP_SEARCHURL}`;
  const TOKEN = `${process.env.REACT_APP_TOKEN}`;
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}${query}`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `${TOKEN}`,
            },  
          }
        );
        setResults(response.data.results);
      } catch (error) {
        console.log('Error fetching search results:', error);
      }
    };

    if (query.trim() !== '') {
      fetchSearchResults();
    }
  }, [query, BASEURL, TOKEN]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputQuery = e.target.elements.searchQuery.value;
    setQuery(inputQuery); // Update the query state with the input value
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1>Search Results for "{query}"</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="searchQuery" defaultValue={query} />
          <button type="submit">Search</button>
        </form>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;

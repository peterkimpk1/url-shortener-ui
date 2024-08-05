import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, postUrls} from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    getUrls()
    .then(data => {
      setUrls([...data.urls])
    })
    .catch(error => {
      console.log(error)
      setError(error.message)})
  },[])
  function addURL(newUrl) {
    const {title, urlToShorten} = newUrl
    postUrls({
      title,
      long_url: urlToShorten
    })
    .then(data => {
      setUrls([...urls,data])
    })
    .catch(error => setError(error.message))
  }
  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addURL={addURL}/>
      </header>
      {error && <h2>{error}</h2>}
      <UrlContainer urls={urls}/>
    </main>
  );
}

export default App;

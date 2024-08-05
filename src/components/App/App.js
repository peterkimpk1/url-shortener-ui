import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, postUrls, deleteUrls} from '../../apiCalls';
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
  function deleteUrl(id) {
    deleteUrls(id)
    .then(resp => {
      if (resp.ok) {
        return resp
      }
    })
    .then(() => {
        const currentUrls = urls.slice()
        const filteredUrls = currentUrls.filter(url => url.id !== id)
        setUrls(filteredUrls)
    })
    .catch(error => {
      setError(error.message)
    })
  }
  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addURL={addURL}/>
      </header>
      {error && <h2>{error}</h2>}
      <UrlContainer urls={urls} deleteUrl={deleteUrl}/>
    </main>
  );
}

export default App;

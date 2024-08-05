import React, { useState } from 'react';

function UrlForm({addURL}) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');
  const [error , setError] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    const newURL = {
      title,
      urlToShorten,
      id: Date.now()
    }
    if(!newURL.title || !newURL.urlToShorten) {
      setError('Please fill out all input fields')
      return;
    }
    if (newURL.title && newURL.urlToShorten) {
      addURL(newURL)
      setError('')
    }
    clearInputs();
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
      {error && <h3 className='form-error'>{error}</h3>}
    </form>
  )
}

export default UrlForm;

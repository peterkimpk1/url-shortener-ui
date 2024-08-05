import React from 'react';
import './UrlContainer.css';

const UrlContainer = ({urls,deleteUrl}) => {
  const urlEls = urls.map(({id,title,long_url,short_url}) => {
    return (
      <div className="url" key={id}>
        <h3>{title}</h3>
        <a href={short_url} target="blank">{short_url}</a>
        <p>{long_url}</p>
        <button onClick={() => deleteUrl(id)}>Delete?</button>
      </div>
    )
  });

  return (
    <section className='url-wrapper'>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;

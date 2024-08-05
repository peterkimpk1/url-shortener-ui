import React from 'react';
import './UrlContainer.css';

const UrlContainer = ({urls}) => {
  const urlEls = urls.map(({id,title,long_url,short_url}) => {
    return (
      <div className="url" key={id}>
        <h3>{title}</h3>
        <a href={short_url} target="blank">{short_url}</a>
        <p>{long_url}</p>
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

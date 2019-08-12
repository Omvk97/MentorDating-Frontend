import React from 'react';
import PlaceholderIcon from '../../assets/twotone-face-24px.svg';

function ImageLoader({ src, mentorId }) {
  const [loaded, setLoaded] = React.useState(false);

  function onLoad() {
    setLoaded(true);
  }

  function tryReFetchMentor() {
    
  }

  return (
    <img
      alt='mentor billede'
      style={{ width: '100%', height: '100%' }}
      src={loaded ? src : PlaceholderIcon}
      onLoad={onLoad}
      onError={tryReFetchMentor}
    />
  );
}

export default ImageLoader;

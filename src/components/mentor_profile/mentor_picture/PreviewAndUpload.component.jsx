import React, { useEffect } from 'react';


function PreviewAndUpload({ pictureBlob }) {
  const picturePreview = URL.createObjectURL(pictureBlob);
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(picturePreview);
    };
  }, [picturePreview]);

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{ width: '85%', height: '85%', objectFit: 'cover' }}
        src={picturePreview}
        alt='Billede forevisning'
      />
    </div>
  );
}

export default PreviewAndUpload;

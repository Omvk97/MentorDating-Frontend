import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';

import { storageRef } from '../../../firebase/firebase.utils';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

function PreviewAndUpload({ pictureBlob, currentUser }) {
    console.log(currentUser);
    
  function uploadImage() {
    const imageRef = storageRef.child(`mentorPictures/${currentUser.id}`);
    imageRef
      .put(pictureBlob)
      .then(response => imageRef.getDownloadURL().then(response2 => console.log('downloadImage', response2)));
  }

  return (
    <Button variant='contained' onClick={uploadImage}>
      Upload
    </Button>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(PreviewAndUpload);

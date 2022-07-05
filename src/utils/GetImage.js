import { useState, useEffect, useMemo } from 'react';
import ImageUtils from '../views/app-views/users/add/imageUtils';
import dummyAvatar from '../assets/avatar/empty-image.png';

export const UseGetImageData = (imageData) => {
  let [getListImage, saveListImage] = useState(null);
  const localDb = useMemo(() => new ImageUtils(), []);
  useEffect(() => {
    if (imageData === null || imageData === undefined || !imageData) {
      getListImage = saveListImage(null);
      return;
    }
    localDb
      .getImage(imageData)
      .then((blob) => {
        if (blob !== null) {
          const blobUrl = window.URL.createObjectURL(blob);
          saveListImage(blobUrl);
        } else {
          saveListImage(null);
        }
      })
      .catch((err) => {
        console.log(err);
        saveListImage(null);
      });
  }, [imageData]);
  return getListImage ? getListImage : dummyAvatar;
};

import React from "react";
import styles from "./PhotoGallery.module.css";

const PhotoGallery = ({ photos }) => {
  return (
    <div className={styles.gallery}>
      {photos.map((photo, index) => (
        <img
          key={index}
          src={`/photos/${photo}`}
          alt={`Photo ${index + 1}`}
          className={styles.photo}
        />
      ))}
    </div>
  );
};

export default PhotoGallery;

import React from "react";
import styles from "./PhotoGallery.module.css";

const PhotoGallery = ({ courses }) => {
  return (
    <div className={styles.gallery}>
      {courses.map((course, index) => (
        <div key={index} className={styles.courseItem}>
          <a href={course.link} target="_blank" rel="noopener noreferrer" className={styles.imageLink}>
            <img
              src={`/photos/${course.img}`}
              alt={`DSA Course ${index + 1}`}
              className={styles.photo}
            />
            <img
              src="/icons/play-icon.png"
              alt="Play Video"
              className={styles.playIcon}
            />
          </a>
          <div className={styles.lectureTitle}>Lecture {index + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;

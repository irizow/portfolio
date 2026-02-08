import styles from "./gallery.module.css";
import prevArrow from "../../assets/images/previous.png";
import nextArrow from "../../assets/images/next.png";
import { useEffect, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";

interface GalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}
export default function Gallery({ images }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlers = useSwipeable({
    onSwipedDown: () => handleArrows(-1),
    onSwipedUp: () => handleArrows(1),
  });

  const [displayedImages, setDisplayedImages] = useState({
    prev: images[images.length - 1],
    curr: images[0],
    next: images[1],
  });

  const updateImages = (newIndex: number) => {
    const prevIndex = (newIndex - 1 + images.length) % images.length;
    const nextIndex = (newIndex + 1) % images.length;
    setDisplayedImages({
      prev: images[prevIndex],
      curr: images[newIndex],
      next: images[nextIndex],
    });
  };
  const handleArrows = (n: number) => {
    if (isAnimating || !images) return;

    setIsAnimating(true);
    const newIndex = (index + n + images.length) % images.length;

    const timeoutId = setTimeout(() => {
      setIndex(newIndex);
      updateImages(newIndex);
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Photo Gallery</div>
      <div className={styles.carrousel} {...handlers}>
        {[displayedImages.prev, displayedImages.curr, displayedImages.next].map(
          (img, i) => (
            <div
              key={`${img.alt}-${i}`}
              className={`${styles.boxes} ${i === 1 ? styles.bigbox : styles.smallbox}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={isAnimating ? styles.animate : ""}
                data-testid="carousel-img"
              />
            </div>
          ),
        )}
      </div>
      <span className={styles.index}>
        {index + 1}/{images.length}
      </span>
      <img
        id={styles.prev}
        className={styles.arrows}
        src={prevArrow}
        onClick={() => {
          handleArrows(-1);
        }}
        alt="icon of arrow to see the previous picture"
      />
      <img
        id={styles.next}
        className={styles.arrows}
        src={nextArrow}
        onClick={() => {
          handleArrows(1);
        }}
        alt="icon of arrow to see the next picture"
      />
    </div>
  );
}

import styles from './gallery.module.css'
import prevArrow from '../../assets/images/previous.png'
import nextArrow from '../../assets/images/next.png'
import { galleryImgs } from '../../assets/gallery/gallery'

import { useEffect, useState } from 'react'


export default function Gallery() {


    const [index, setIndex] = useState(0);
    const [images, setImages] = useState({
        prev: galleryImgs[galleryImgs.length - 1],
        curr: galleryImgs[0],
        next: galleryImgs[1]
    })

    const updateImages = (newIndex) => {
        const prevIndex = (newIndex - 1 + galleryImgs.length) % galleryImgs.length;
        const nextIndex = (newIndex + 1) % galleryImgs.length;
        setImages({
            prev: galleryImgs[prevIndex],
            curr: galleryImgs[newIndex],
            next: galleryImgs[nextIndex]
        });
    };

    const handleArrows = (n) => {
        const newIndex = (index + n + galleryImgs.length) % galleryImgs.length;
        setIndex(newIndex);
        updateImages(newIndex);
    }



    return (
        <div className={styles.container}>
            <div className={styles.header}>Photo Gallery</div>
            <div className={styles.carrousel}>
                <div className={`${styles.boxes} ${styles.smallbox}`}>
                <img loading='lazy' src={images.prev.src} alt={images.prev.alt}></img>
                </div>
                <div className={`${styles.boxes} ${styles.bigbox}`}>
                    <img loading='lazy' src={images.curr.src} alt={images.curr.alt}></img>
                </div>
                <div className={`${styles.boxes} ${styles.smallbox}`}>
                    <img loading='lazy' src={images.next.src} alt={images.next.alt}></img>
                </div>
                
            </div>
            <span className={styles.index}>{index+1}/{galleryImgs.length}</span>
            <img id={styles.prev} className={styles.arrows} src={prevArrow} onClick={()=> {handleArrows(-1)}} alt="icon of arrow to see the previous picture"/>
            <img id={styles.next} className={styles.arrows} src={nextArrow} onClick={()=> {handleArrows(1)}} alt="icon of arrow to see the next picture"/>
        </div>
    )
}
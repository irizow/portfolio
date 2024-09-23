import React, { useState, useEffect } from 'react';
import styles from './flashlight.module.css'

export default function Flashlight() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {

    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const background = document.querySelector(`.${styles.overlay}`);

    if (background) {
    background.style.background = `radial-gradient(circle 10rem at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 1))`;
    }
  }, [coords])

  return (
   <div className={styles.overlay} style={{ '--x': `${coords.x}px`, '--y': `${coords.y}px` }}></div> 
  )
};

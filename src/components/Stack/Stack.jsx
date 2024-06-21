import styles from './stack.module.css'
import prevArrow from '../../assets/images/previous.png'
import nextArrow from '../../assets/images/next.png'
import { stackIcons } from '../../assets/images/stackimages'

import { useEffect, useState } from 'react'


export default function Stack() {
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                if(prevIndex+1 < stackIcons.length) return prevIndex +1
                else return 0
            })
        }, 1000);

        return () => clearInterval(interval)
    },[])

    const condition = index > 0
    const condition2 = index < stackIcons.length-1

    return (
        <div className={styles.container}>
            <div className={styles.carrousel}>
                <div className={`${styles.boxes} ${styles.smallbox}`}>
                <img src={condition ? stackIcons[index-1].src : stackIcons[stackIcons.length-1].src} alt={condition ? stackIcons[index-1].alt : stackIcons[stackIcons.length-1].alt}></img>
                    <span>{condition ? stackIcons[index-1].name : stackIcons[stackIcons.length-1].name} </span>
                </div>
                <div className={`${styles.boxes} ${styles.bigbox}`}>
                <img src={stackIcons[index].src} alt={stackIcons[index].alt}></img>
                    <span>{stackIcons[index].name} </span>
                </div>
                <div className={`${styles.boxes} ${styles.smallbox}`}>
                <img src={ condition2 ? stackIcons[index+1].src : stackIcons[0].src} alt={condition2 ? stackIcons[index+1].alt : stackIcons[0].alt}></img>
                    <span>{condition2 ? stackIcons[index+1].name : stackIcons[0].name} </span>
                </div>
                
            </div>
        </div>
    )
}
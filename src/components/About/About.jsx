import styles from './about.module.css'
import TypeWritter from '../../utils/Typewriter'
import arrowDownIcon from '../../assets/images/arrowdown.png'
import { useState, useEffect, useRef } from 'react';

export default function About() {

    const [arrowClicked, setArrowClicked] = useState(false);
    const myRef = useRef(null)

    const handleClick = ()=> {
        setArrowClicked(true)
    }

    useEffect(()=> {
        if(myRef.current) {
            myRef.current.scrollIntoView({behavior: 'smooth'})
        }
    },[arrowClicked])


    return (
        <>
        <div className={styles.container}>
            <div className={styles.titlewrapper}>
                <span className={styles.span1}>Hi! I'm Iris, A </span>
                <span className={styles.span2}><TypeWritter text={" Full Stack Developer."} delay={100} /></span>
            </div>
                {!arrowClicked && 
                <div className={styles.arrowdown}>
                <img src={arrowDownIcon} alt="arrow down icon" onClick={handleClick}></img>
                </div>
                }
        </div>
        {arrowClicked && 
            <div className={styles.description} ref={myRef}>
                <span>I did this and that</span>
            </div>
            }
         </>
    )
}
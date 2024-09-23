import styles from './about.module.css'
import TypeWritter from '../../utils/Typewriter'
import arrowDownIcon from '../../assets/images/arrowdown.png'
import desktopIcon from '../../assets/images/desktop.png'
import catalanIcon from '../../assets/images/catalan.png'
import spanishIcon from '../../assets/images/spanish.png'
import englishIcon from '../../assets/images/english.png'
import moonBgIcon from '../../assets/images/moonbg.png'
import starsIcon from '../../assets/images/stars.png'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import AboutMe from './AboutMe';
import Stack from './Stack'
import Flashlight from '../../utils/Flashlight'

export default function About() {

    const [language, setLanguage] = useState("English")
    const [arrowClicked, setArrowClicked] = useState(false);
    const myRef = useRef(null);

    const handleClick = ()=> {
        setArrowClicked(true)
    }

    useEffect(()=> {
        if(myRef.current) {
            myRef.current.scrollIntoView({behavior: 'smooth'})
        }
    },[arrowClicked])

    const desktopText = language === "English" ? "Desktop" : language === "Spanish" ? "Escritorio" : "Escriptori"
    const text1 = language === "English" ? "Hi! I'm Iris, A " : language === "Spanish" ? "¡Hola! soy Iris," : "Hola! Soc la Iris,  "
    const text2 = language === "English" ? " Full Stack Developer" : language === "Spanish" ? " Desarrolladora Full Stack" : " Desenvolupadora Full Stack"

    return (
        <>
        <Flashlight/>
        <div className={styles.container}>
            <div className={styles.titlewrapper}>
                <span className={styles.span1}>{text1}</span>
                <span className={styles.span2}><TypeWritter text={text2} delay={100} /></span>
            </div>
                <Link className={styles.desktop} to='/'>
                        <img src={desktopIcon} alt="go to desktop icon"></img>
                        <span>{desktopText}</span>  
                </Link>
                {!arrowClicked && 
                <div className={styles.arrowdown}>
                <img src={arrowDownIcon} alt="arrow to scroll down icon" onClick={handleClick}></img>
                </div>
                }
        </div>
        <div className={styles.languages}>
            <img src={englishIcon} onClick={()=> {setLanguage("English")}}></img>
            <img src={spanishIcon} onClick={()=> {setLanguage("Spanish")}}></img>
            <img src={catalanIcon} onClick={()=> {setLanguage("Catalan")}}></img>
        </div>
        {arrowClicked && 
            <>
                <div className={styles.description} ref={myRef}>
                <AboutMe language={language} />
                </div>
                <section className={styles.stackbox}>
                <h1 className={styles.stacktitle}>Stack</h1>
                <div className={styles.stackwrapper}>
                    <Stack/>
                </div>
                </section>
            </>
             
            }
         </>
    )
}
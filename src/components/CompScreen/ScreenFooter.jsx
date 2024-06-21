import { useEffect, useState } from "react"
import styles from './compscreen.module.css'
import moonIcon from '../../assets/images/moon.png'
import sunIcon from '../../assets/images/sun.png'
import messageIcon from '../../assets/images/message.png'
import calculatorIcon from '../../assets/images/calculator.png'
import gameIcon from '../../assets/images/game.png'

export default function ScreenFooter({darkTheme, setDarkTheme}) {
    let [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            let date = new Date();
            let timeString = date.toLocaleTimeString();
            setTime(timeString)
        }
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, [])


    const handleClick = ()=> {
        setDarkTheme(!darkTheme)
    }
    return (
        <div className={styles.footer}>
            <div className={styles.iconbox}>
                <img src={darkTheme ? sunIcon : moonIcon} onClick={()=> {handleClick()}}></img>
                <a href={"mailto:irisrossell@gmail.com?subject=Hello%20Iris!&body=I%20would%20like%20to%20work%20with%20you%20ASAP."}>
                    <img src={messageIcon} alt="Message icon"></img>
                </a>
                <a href="https://irizow.github.io/calculator-js/" target="_blank" rel="noopener noreferrer">
                    <img src={calculatorIcon} alt="Calculator icon"></img>
                </a>
                <img src={gameIcon} alt="game icon"></img>
            </div>
            <p>Iris Rossell</p>
            <p>{time}</p>
        </div>
    )
}
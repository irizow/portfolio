import { useEffect, useState, useRef } from "react"
import styles from './compscreen.module.css'
import moonIcon from '../../assets/images/moon.png'
import sunIcon from '../../assets/images/sun.png'
import messageIcon from '../../assets/images/message.png'
import calculatorIcon from '../../assets/images/calculator.png'
import gameIcon from '../../assets/images/game.png'
import GameMenu from "../GameMenu/GameMenu"

export default function ScreenFooter({darkTheme, setDarkTheme}) {
    const [time, setTime] = useState('');
    const [isGameMenu, setIsGameMenu] = useState(false);
    const gameRef = useRef();
    const color = darkTheme ? 'white' : 'black';

    const handleClickOut = (e, ref) => {
        if(isGameMenu && !gameRef.current.contains(e.target)) {
            setIsGameMenu(false)
        }
    }

    useEffect(()=> {
        document.addEventListener('click', handleClickOut);
        return ()=> document.removeEventListener('click', handleClickOut)
    });

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
        <div className={styles.footer} style={{color}}>
            <div className={styles.iconbox} >
                <img src={darkTheme ? sunIcon : moonIcon} onClick={()=> {handleClick()}}></img>
                
                <a href="https://irizow.github.io/calculator-js/" target="_blank" rel="noopener noreferrer">
                    <img src={calculatorIcon} alt="Calculator icon"></img>
                </a>
                <img src={gameIcon} alt="game icon" ref={gameRef} onClick={()=>{setIsGameMenu(!isGameMenu)}}></img>
            </div>
            <p className={styles.footername}>Iris Rossell</p>
            <p>{time}</p>
            {isGameMenu && <GameMenu darktheme={darkTheme} />}
        </div>
    )
}
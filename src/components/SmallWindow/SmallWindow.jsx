import styles from './smallwindow.module.css'
import minimizeIcon from '../../assets/images/minimize.png'
import maximizeIcon from '../../assets/images/maximize.png'
import closeIcon from '../../assets/images/close.png'
import { useEffect, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'

export default function SmallWindow({setIsSmllWndw, title, children}) {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        if(window.innerWidth < 750) {
            setIsMobile(true)
        }
        else {
            setIsMobile(false)
        }
    }

    useEffect(()=> {
        handleResize();

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
          };

    }, [])
    


    return (
        <motion.div 
        className={ isMaximized ? styles.bigwindow :styles.smallwindow}
        drag={ isMobile ? false : true}
        style={isMaximized && {right: '0', top: '0'}}
        
        dragConstraints={isMaximized ?
            {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            } :{
            top: -100,
            left: -500,
            right: 100,
            bottom: 100,
        }}
        dragElastic={0}
        >
            <div className={styles.windowheader}>
                <span>{title}</span>
                <div className={styles.iconscontainer}>
                    <img className={styles.wndbtn} src={minimizeIcon} alt="minimize window icon"></img>
                    <img className={styles.wndbtn} src={maximizeIcon} alt="maximize window icon" onClick={()=>{setIsMaximized(!isMaximized)}}></img>
                    <img className={styles.closebtn} src={closeIcon} alt="close window icon" onClick={()=>{setIsSmllWndw(false)}}></img>
                </div>
            </div>
            <div className={styles.windowcontent}>
            {children}
            </div>
        </motion.div>
    )
}
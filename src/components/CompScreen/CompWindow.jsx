import { useState } from 'react'
import styles from './compscreen.module.css'
import folderImg from '../../assets/images/folder.png'
import documentImg from '../../assets/images/documenticon.png'
import stackImg from '../../assets/images/layer.png'
import notesImg from '../../assets/images/notes.png'
import githubImg from '../../assets/images/github.png'
import SmallWindow from '../SmallWindow/SmallWindow'
import Stack from '../Stack/Stack'
import Projects from '../Projects/Projects'
import { Link } from 'react-router-dom'

export default function CompWindow({darkTheme}) {

    const [isSmllWndw, setIsSmllWndw] = useState(false);
    const [component, setComponent] = useState(null);

    function handleClick(element) {
        setComponent(element)
        setIsSmllWndw(true)
    }

    return(
        <div className={darkTheme ? `${styles.window} ${styles.dark}` : `${styles.window} ${styles.light}`}>
            {isSmllWndw && <SmallWindow setIsSmllWndw={setIsSmllWndw} children={component} />}
            <div className={styles.boxescontainer}>
                <div className={styles.boxes}>
                    <img src={folderImg} alt="Folder icon" onClick={()=> {handleClick(<Projects/>)}}></img>
                    <span>Projects</span>
                </div>
                <div className={styles.boxes}>
                    <img src={stackImg} alt="Stack icon" onClick={()=> {handleClick(<Stack/>)}}></img>
                    <span>Stack</span>
                </div>
                <div className={styles.boxes}>
                    <Link to='/about'>
                    <img src={documentImg} alt="Document icon"></img>
                    <span>About me</span>
                    </Link>
                </div>
                <div className={styles.boxes}>
                    <img src={documentImg} alt="Document icon"></img>
                    <span>CV</span>
                </div>
                <a href="https://irizow.github.io/to-do-list/" target='_blank' rel='noopener noreferrer'>
                    <div className={styles.boxes}>
                        <img src={notesImg} alt="Notes icon"></img>
                        <span>Tasks</span>
                    </div>
                </a>
                <a href="https://github.com/irizow" target='_blank' rel='noopener noreferrer'>
                    <div className={styles.boxes}>
                        <img src={githubImg} className={darkTheme ? styles.invert : '' } alt="Github icon"></img>
                        <span>Github</span>
                    </div>
                </a>
            </div>
        </div>
    )
}
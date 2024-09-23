import styles from './gamemenu.module.css'
import memoryIcon from '../../assets/images/memory.png'
import tictactoeIcon from '../../assets/images/tictactoe.png'
import etchIcon from '../../assets/images/etch.png'

export default function GameMenu({darkTheme}) {
    return (
        <div className={darkTheme ? `${styles.gamemenu} ${styles.light}` : `${styles.gamemenu} ${styles.dark}`}>
            <a href="https://irizow.github.io/etch-a-sketch/" target="_blank" rel="noopener noreferrer" >
                <div className={styles.gamecontainer}>
                    <img src={etchIcon} alt="etch a sketch icon"></img>
                    <span>Etch a sketch</span>
                </div>
            </a>
            <a href="https://irizow.github.io/Tic-tac-toe/" target="_blank" rel="noopener noreferrer" >
                <div className={styles.gamecontainer}>
                    <img src={tictactoeIcon} alt="tic tac toe game icon"></img>
                    <span>Tic tac toe</span>
                </div>
            </a>
            <a href="https://pokemon-memory-vert.vercel.app/" target="_blank" rel="noopener noreferrer" >
                <div className={styles.gamecontainer}>
                    <img src={memoryIcon} alt="memory game icon"></img>
                    <span>Memory game</span>
                </div>
            </a>
        </div>
    )
}
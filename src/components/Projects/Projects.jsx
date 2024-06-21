import styles from './projects.module.css'
import weatherIcon from '../../assets/images/weather.png'
import cvIcon from '../../assets/images/cvgen.png'
import storeIcon from '../../assets/images/store.png'
import terminalIcon from '../../assets/images/terminal.png'

export default function Projects() {
    return (
        <div className={styles.container}>
            <div className={styles.boxes}>
                <a href="https://irizow.github.io/weather-app" target='_blank' rel='noopener noreferrer'>
                    <img src={weatherIcon} alt="weather app icon"></img>
                    <span>Weather App</span>
                </a>
            </div>
            <div className={styles.boxes}>
                <a href="https://irizow.github.io/weather-app" target='_blank' rel='noopener noreferrer'>
                    <img src={terminalIcon} alt="coding document icon"></img>
                    <span>Weather App Code</span>
                </a>
            </div>
            <div className={styles.boxes}>
                <a href="https://vape-store-delta.vercel.app/" target='_blank' rel='noopener noreferrer'>
                    <img src={storeIcon} alt="store app icon"></img>
                    <span>Vape Store</span>
                </a>
            </div>
            <div className={styles.boxes}>
                <a href="https://irizow.github.io/weather-app" target='_blank' rel='noopener noreferrer'>
                    <img src={terminalIcon} alt="coding document icon"></img>
                    <span>Vape Store App Code</span>
                </a>
            </div>
            <div className={styles.boxes}>
                <a href="https://cv-generator-puce-iota.vercel.app/" target='_blank' rel='noopener noreferrer'>
                    <img src={cvIcon} alt="curriculum generator app icon"></img>
                    <span>CV Generator</span>
                </a>
            </div>
            <div className={styles.boxes}>
                <a href="https://irizow.github.io/weather-app" target='_blank' rel='noopener noreferrer'>
                    <img src={terminalIcon} alt="coding document icon"></img>
                    <span>CV generator Code</span>
                </a>
            </div>
        </div>
    )
}
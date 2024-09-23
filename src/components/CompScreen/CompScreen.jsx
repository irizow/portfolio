import ScreenFooter from "./ScreenFooter";
import CompWindow from "./CompWindow";
import styles from './compscreen.module.css'

export default function CompScreen({darkTheme, setDarkTheme}) {
    return (
        <>
        <CompWindow darkTheme={darkTheme}/>
        <ScreenFooter darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        </>
    )
}
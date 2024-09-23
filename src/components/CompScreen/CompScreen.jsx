import ScreenFooter from "./ScreenFooter";
import CompWindow from "./CompWindow";
import { useState } from "react";
import styles from './compscreen.module.css'

export default function CompScreen({darkTheme, setDarkTheme}) {
    
    const [isSmllWndw, setIsSmllWndw] = useState(false);
    const [component, setComponent] = useState(null);

    function handleClick(element) {
        setComponent(element)
        setIsSmllWndw(true)
    }

    return (
        <>
        <CompWindow darkTheme={darkTheme} isSmllWndw={isSmllWndw} handleClick={handleClick} setIsSmllWndw={setIsSmllWndw} component={component}/>
        <ScreenFooter darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        </>
    )
}
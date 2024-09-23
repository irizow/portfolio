import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import styles from './about.module.css'
import { stackIcons } from '../../assets/images/stackimages'

export default function Stack() {
    const stackImg = stackIcons.map(function(icon, index) {
        return <div key={index}>
            <img src={icon.src} alt={icon.alt}></img>
            <span>{icon.name}</span>
        </div>
    })

    return (
        <div className={styles.stackcontainer}>
            {stackImg}
        </div>
    )
}
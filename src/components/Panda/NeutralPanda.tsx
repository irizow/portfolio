import { SpriteAnimator } from "react-sprite-animator";
import styles from './panda.module.css'
import neutralPanda from '../../assets/panda/neutral-panda-sheet.png'

export default function NeutralPanda() {   
    const frameWidth = 64; 
    const frameHeight = 64; 
     const screenMiddle = window.innerWidth / 2 - frameWidth/2;

    return (
        <div
         className={styles.pixelated}
      style={{
        position: "absolute",
        left: screenMiddle,
        bottom: '3rem',
        transition: "left 2s linear, top 2s linear", // smooth slide,
        transformOrigin: "top left",
      }}
    >
        <SpriteAnimator
            sprite={neutralPanda}
            width={frameWidth}
            height={frameHeight}
            frameCount={10}
            fps={6}
            loop={true}
            direction="horizontal"
            shouldAnimate={true}
        />
        </div>
    )
    }
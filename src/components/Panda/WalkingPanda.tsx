import { useEffect, useState } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import walkingPanda from '../../assets/panda/walking-panda-sheet.png'
import styles from './panda.module.css'

export default function WalkingPanda({setIsInMiddle}: {setIsInMiddle: (value: boolean) => void}) {
    const frameWidth = 64; 
    const frameHeight = 64;
    const pandaSpeed = 150

    const [x, setX] = useState<number>(window.innerWidth + 100);

    useEffect(() => {
    const interval = setInterval(() => {
        const screenMiddle = window.innerWidth / 2 - frameWidth/2;
        if(x === screenMiddle) setIsInMiddle(true);

      setX((prevX) => Math.max(prevX - pandaSpeed, screenMiddle));
    }, 2000);

    return () => clearInterval(interval);
  }, [x]);
     return (
     <div
         className={styles.pixelated}
      style={{
        position: "absolute",
        left: x,
        bottom: 0,
        transition: "left 2s linear, top 2s linear", // smooth slide,
        transformOrigin: "top left",
      }}
    >
        <SpriteAnimator
            sprite={walkingPanda}
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
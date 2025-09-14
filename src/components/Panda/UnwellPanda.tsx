import { SpriteAnimator } from "react-sprite-animator";
import styles from './panda.module.css'
import tiredPanda from '../../assets/panda/tired-panda-sheet.png'
import cryingPanda from '../../assets/panda/crying-panda-sheet.png'
import angryPanda from '../../assets/panda/angry-panda-sheet.png'
import { useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function UnwellPanda({stats}: {stats: {hunger: number; energy: number; boredom: number}}) { 
  const isMobile = useIsMobile();
  const [isAngry, setIsAngry] = useState<boolean>(false);
    const frameWidth = 64; 
    const frameHeight = 64; 
     const screenMiddle = window.innerWidth / 2 - frameWidth/2;
    useEffect(()=> {
      if (isAngry) {
        const timer = setTimeout(() => {    
            setIsAngry(false);
        }, 6000);
        return () => clearTimeout(timer);
      }
    }, [isAngry]);
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
      onClick={()=> { isMobile ? null : setIsAngry(true)}}
      onDoubleClick={()=> { isMobile ? setIsAngry(true) : null}}
    >
        <SpriteAnimator
            sprite={isAngry ? angryPanda : stats.hunger > 70 ? cryingPanda : stats.energy < 30 ?tiredPanda : tiredPanda}
            width={frameWidth}
            height={frameHeight}
            frameCount={isAngry ? 18 : 10}
            fps={6}
            loop={true}
            direction="horizontal"
            shouldAnimate={true}
        />
        </div>
    )
    }
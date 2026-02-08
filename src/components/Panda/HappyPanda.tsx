import { SpriteAnimator } from "react-sprite-animator";
import styles from "./panda.module.css";
import happyPanda from "../../assets/panda/panda-to-happy-sheet.png";
import smilingPanda from "../../assets/panda/smiling-panda-sheet.png";
import { useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function HappyPanda() {
  const isMobile = useIsMobile();
  const frameWidth = 64;
  const frameHeight = 64;
  const screenMiddle = window.innerWidth / 2 - frameWidth / 2;
  const [isVeryHappy, setIsVeryHappy] = useState<boolean>(true);

  useEffect(() => {
    if (isVeryHappy) {
      const timer = setTimeout(() => {
        setIsVeryHappy(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVeryHappy]);

  return (
    <div
      className={styles.pixelated}
      style={{
        position: "absolute",
        left: screenMiddle,
        bottom: "3rem",
        transition: "left 2s linear, top 2s linear", // smooth slide,
        transformOrigin: "top left",
      }}
      onClick={() => {
        isMobile ? null : setIsVeryHappy(true);
      }}
      onDoubleClick={() => {
        isMobile ? setIsVeryHappy(true) : null;
      }}
    >
      <SpriteAnimator
        sprite={isVeryHappy ? happyPanda : smilingPanda}
        width={frameWidth}
        height={frameHeight}
        frameCount={10}
        fps={6}
        loop={true}
        direction="horizontal"
        shouldAnimate={true}
      />
    </div>
  );
}

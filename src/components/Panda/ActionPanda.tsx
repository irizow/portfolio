import { SpriteAnimator } from "react-sprite-animator";
import styles from "./panda.module.css";
import eatingPanda from "../../assets/panda/eating-panda-sheet.png";
import sleepingPanda from "../../assets/panda/sleeping-panda-sheet.png";
import playingPanda from "../../assets/panda/playing-panda-sheet.png";
import React, { useEffect } from "react";
import { Stats } from "./types";

interface ActionPandaProps {
  isEating: boolean;
  setIsEating: (val: boolean) => void;
  isSleeping: boolean;
  setIsSleeping: (val: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
}

export default function ActionPanda({
  isEating,
  setIsEating,
  isSleeping,
  setIsSleeping,
  isPlaying,
  setIsPlaying,
}: ActionPandaProps) {
  const frameWidth = 64;
  const frameHeight = 64;
  const screenMiddle = window.innerWidth / 2 - frameWidth / 2;
  useEffect(() => {
    const isActive = isEating || isSleeping || isPlaying;

    if (!isActive) return;

    const timer = setTimeout(() => {
      setIsEating(false);
      setIsSleeping(false);
      setIsPlaying(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isEating, isSleeping, isPlaying]);

  return (
    <div
      className={styles.pixelated}
      style={{
        position: "absolute",
        left: screenMiddle,
        bottom: "3rem",
        transformOrigin: "top left",
      }}
    >
      <SpriteAnimator
        sprite={
          isEating ? eatingPanda : isSleeping ? sleepingPanda : playingPanda
        }
        width={frameWidth}
        height={frameHeight}
        frameCount={16}
        fps={6}
        loop={true}
        direction="horizontal"
        shouldAnimate={true}
      />
    </div>
  );
}

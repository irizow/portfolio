import { SpriteAnimator } from "react-sprite-animator";
import styles from "./panda.module.css";
import greetingPanda from "../../assets/panda/panda-say-hi-sheet.png";
import { useEffect, useState } from "react";

export default function GreetingPanda() {
  const frameWidth = 64;
  const frameHeight = 64;
  const screenMiddle = window.innerWidth / 2 - frameWidth / 2;

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
    >
      <SpriteAnimator
        sprite={greetingPanda}
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

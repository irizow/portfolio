import styles from "./smallwindow.module.css";
import minimizeIcon from "../../assets/images/minimize.png";
import maximizeIcon from "../../assets/images/maximize.png";
import closeIcon from "../../assets/images/close.png";
import React, { SetStateAction, useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";
import { DesktopProject } from "../data/DesktopProjects";

interface SmallWindowProps {
  setActiveProject: React.Dispatch<SetStateAction<DesktopProject | null>>;
  children: React.ReactNode;
  projectIsGame: boolean;
}

export default function SmallWindow({
  setActiveProject,
  children,
  projectIsGame = false,
}: SmallWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const isMobile = useIsMobile();
  const colors = [
    "var(--pastel-pink)",
    "var(--pastel-yellow)",
    "var(--pastel-green)",
    "var(--pastel-blue)",
    "var(--pastel-purple)",
  ];
  const bigWindow = isMaximized || isMobile;

  return (
    <motion.div
      className={`${bigWindow ? styles.big : styles.small} ${projectIsGame ? "game" : ""} ${styles.window}`}
      drag={isMobile ? false : true}
      style={
        bigWindow
          ? { right: "0", top: "0" }
          : projectIsGame
            ? { width: "fit-content", height: "fit-content", scale: "0.8" }
            : {}
      }
      dragConstraints={
        bigWindow
          ? {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }
          : {
              top: -100,
              left: -500,
              right: 100,
              bottom: 100,
            }
      }
      dragElastic={0}
    >
      <div
        className={styles.windowheader}
        style={{
          background: colors[Math.floor(Math.random() * colors.length)],
        }}
      >
        <div className={styles.iconscontainer}>
          <img
            className={styles.wndbtn}
            src={minimizeIcon}
            alt="minimize window icon"
          ></img>
          <img
            className={styles.wndbtn}
            src={maximizeIcon}
            alt="maximize window icon"
            onClick={() => {
              setIsMaximized(!isMaximized);
            }}
          ></img>
          <img
            className={styles.closebtn}
            src={closeIcon}
            alt="close window icon"
            onClick={() => {
              setActiveProject(null);
            }}
          ></img>
        </div>
      </div>
      <div className={styles.windowcontent}>{children}</div>
    </motion.div>
  );
}

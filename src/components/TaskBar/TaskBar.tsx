import React, {
  useEffect,
  useState,
  useRef,
  SetStateAction,
  HTMLAttributeReferrerPolicy,
} from "react";
import styles from "./taskbar.module.css";
import moonIcon from "../../assets/icons/moon-icon.webp";
import sunIcon from "../../assets/icons/sun-icon.webp";
import messageIcon from "../../assets/images/message.png";
import calculatorIcon from "../../assets/icons/calculator-icon.webp";
import gameIcon from "../../assets/icons/controller-icon.webp";
import GameMenu from "../GameMenu/GameMenu.jsx";

interface TaskBarProps {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<SetStateAction<boolean>>;
}

export default function TaskBar({ darkTheme, setDarkTheme }: TaskBarProps) {
  const [time, setTime] = useState("");
  const [isGameMenu, setIsGameMenu] = useState(false);
  const gameRef = useRef<HTMLImageElement | null>(null);
  const color = darkTheme ? "white" : "black";

  const handleClickOut = (e: MouseEvent) => {
    if (
      isGameMenu &&
      gameRef.current &&
      !gameRef.current.contains(e.target as Node)
    ) {
      setIsGameMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOut);
    return () => document.removeEventListener("click", handleClickOut);
  });

  useEffect(() => {
    const updateTime = () => {
      let date = new Date();
      let timeString = date.toLocaleTimeString();
      setTime(timeString);
    };
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    setDarkTheme(!darkTheme);
  };
  return (
    <div className={styles.taskbar} style={{ color }}>
      <div className={styles.iconbox}>
        <img
          src={darkTheme ? sunIcon : moonIcon}
          onClick={() => {
            handleClick();
          }}
        ></img>

        <a
          href="https://irizow.github.io/calculator-js/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={calculatorIcon} alt="Calculator icon"></img>
        </a>
        <img
          src={gameIcon}
          alt="game icon"
          ref={gameRef}
          onClick={() => {
            setIsGameMenu(!isGameMenu);
          }}
        ></img>
      </div>
      <p className={styles.taskbarname}>Iris Rossell</p>
      <p>{time}</p>
      {isGameMenu && <GameMenu darkTheme={darkTheme} />}
    </div>
  );
}

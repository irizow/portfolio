import { useState } from "react";
import styles from "./compscreen.module.css";
import folderImg from "../../assets/icons/folder-icon.webp";
import documentImg from "../../assets/icons/document-icon.webp";
import galleryImg from "../../assets/icons/gallery-icon.webp";
import notesImg from "../../assets/icons/tasks-icon.webp";
import githubImg from "../../assets/images/github.png";
import emailImg from "../../assets/icons/envelope-icon.webp";
import controllerIcon from "../../assets/icons/controller-icon.webp";
import SmallWindow from "../SmallWindow/SmallWindow";
import Game from "../Game/Game";
import Gallery from "../Gallery/Gallery";
import Projects from "../Projects/Projects";
import Contact from "../Contact/Contact";
import { Link } from "react-router-dom";
import cvPdf from "../../assets/IrisRossellCV.pdf";
import { galleryImgs } from "../../assets/gallery/gallery.ts";
import StickerNotes from "../StickerNotes/StickerNotes";
import Panda from "../Panda/Panda.tsx";

export default function CompWindow({ darkTheme }) {
  const [isSmllWndw, setIsSmllWndw] = useState(false);
  const [component, setComponent] = useState(null);
  const [requiresBigScreen, setRequiresBigScreen] = useState(false);

  function handleClick(element) {
    setComponent(element);
    setIsSmllWndw(true);
  }

  const onDownloadClick = () => {
    const link = document.createElement("a");
    link.href = cvPdf;
    link.download = "IrisRossellCV.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`${styles.window} ${darkTheme ? styles.dark : styles.light}`}
    >
      {isSmllWndw && (
        <SmallWindow
          setIsSmllWndw={setIsSmllWndw}
          isMaximized={requiresBigScreen}
          children={component}
        />
      )}
      <div className={styles.boxescontainer}>
        <div className={styles.boxes}>
          <img
            src={folderImg}
            alt="Folder icon"
            onClick={() => {
              handleClick(<Projects />);
            }}
          ></img>
          <span>Projects</span>
        </div>
        <div className={styles.boxes}>
          <img
            src={galleryImg}
            alt="Gallery icon"
            onClick={() => {
              handleClick(<Gallery images={galleryImgs} />);
            }}
          ></img>
          <span>Pictures</span>
        </div>
        <Link to="/about">
          <div className={styles.boxes}>
            <img src={documentImg} alt="Document icon"></img>
            <span>About me</span>
          </div>
        </Link>
        <div className={styles.boxes} onClick={onDownloadClick}>
          <img src={documentImg} alt="Document icon"></img>
          <span>CV</span>
        </div>
        <a
          href="https://to-do-list-burd.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.boxes}>
            <img src={notesImg} alt="Notes icon"></img>
            <span>Tasks</span>
          </div>
        </a>
        <a
          href="https://github.com/irizow"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.boxes}>
            <img
              src={githubImg}
              className={darkTheme ? styles.invert : ""}
              alt="Github icon"
            ></img>
            <span>Github</span>
          </div>
        </a>
        <div className={styles.boxes}>
          <img
            src={emailImg}
            alt="Email icon"
            onClick={() => {
              handleClick(<Contact />);
            }}
          ></img>
          <span>Contact</span>
        </div>
        <div className={styles.boxes}>
          <img
            src={controllerIcon}
            alt="Controller icon"
            onClick={() => {
              handleClick(<Game />);
              setRequiresBigScreen(true);
            }}
          ></img>
          <span>MyLife</span>
        </div>
      </div>
      <StickerNotes />
      <Panda />
    </div>
  );
}

import React, { ComponentType, SetStateAction, useState } from "react";
import documentImg from "../../assets/icons/document-icon.webp";
import notesImg from "../../assets/icons/tasks-icon.webp";
import githubImg from "../../assets/images/github.png";
import styles from "./desktop.module.css";
import { Link } from "react-router-dom";
import StickerNotes from "../StickerNotes/StickerNotes.tsx";
import Panda from "../Panda/Panda.tsx";
import TaskBar from "../TaskBar/TaskBar.tsx";
import { DesktopProjects, Project } from "../data/DesktopProjects.ts";
import cvPdf from "../../assets/IrisRossellCV.pdf";
import SmallWindow from "../SmallWindow/SmallWindow.jsx";
import Game from "../Game/Game.tsx";
import { Login } from "../Login/Login.tsx";

interface DesktopProps {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<SetStateAction<boolean>>;
}

export default function Desktop({ darkTheme, setDarkTheme }: DesktopProps) {
  const [activeProject, setActiveProject] = useState<Project<any> | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  function handleClick(project: Project) {
    setActiveProject(project);
  }

  const onDownloadClick = () => {
    const link = document.createElement("a");
    link.href = cvPdf;
    link.download = "IrisRossellCV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`${styles.window} ${darkTheme ? styles.dark : styles.light}`}
    >
      {activeProject && (
        <SmallWindow
          setActiveProject={setActiveProject}
          projectIsGame={activeProject.title === "Pkmn"}
        >
          <activeProject.component
            {...activeProject.props}
            {...(activeProject.title === "Todos" ? { setIsLogin } : {})}
          />
        </SmallWindow>
      )}
      <div className={styles.boxescontainer}>
        {DesktopProjects.map((project) => (
          <div className={styles.box}>
            <img
              src={project.img}
              alt={project.alt}
              onClick={() => handleClick(project)}
            ></img>
            <span>{project.title}</span>
          </div>
        ))}
        <Link to="/about">
          <div className={styles.box}>
            <img src={documentImg} alt="Document icon"></img>
            <span>About me</span>
          </div>
        </Link>
        <div className={styles.box} onClick={onDownloadClick}>
          <img src={documentImg} alt="Document icon"></img>
          <span>CV</span>
        </div>
        <a
          href="https://github.com/irizow"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.box}>
            <img
              src={githubImg}
              className={darkTheme ? styles.invert : ""}
              alt="Github icon"
            ></img>
            <span>Github</span>
          </div>
        </a>
      </div>
      <StickerNotes />
      <Panda />
      {isLogin && (
        <SmallWindow setActiveProject={setIsLogin} projectIsGame={false}>
          {<Login />}
        </SmallWindow>
      )}
      <TaskBar
        setIsLogin={setIsLogin}
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
      />
    </div>
  );
}

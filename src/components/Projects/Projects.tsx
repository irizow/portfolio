import styles from "./projects.module.css";
import { projects } from "../data/FolderProjects";

interface Project {
  href: string;
  icon: string;
  alt: string;
  title: string;
}

export default function Projects() {
  function Project({ href, icon, alt, title }: Project) {
    return (
      <div className={styles.projboxes}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <img src={icon} alt={alt}></img>
          <span>{title}</span>
        </a>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {projects.map((project, index) => (
        <Project
          key={index}
          title={project.title}
          alt={project.alt}
          icon={project.icon}
          href={project.href}
        />
      ))}
    </div>
  );
}

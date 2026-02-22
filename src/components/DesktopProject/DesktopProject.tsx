import styles from "./desktopproject.module.css";

interface DesktopProjectProps {
  img: string;
  alt: string;
  title: string;
  handleClick: () => void;
}
export default function DesktopProject({
  img,
  alt,
  title,
  handleClick,
}: DesktopProjectProps) {
  return (
    <div className={styles.box}>
      <img src={img} alt={alt} onClick={handleClick}></img>
      <span>{title}</span>
    </div>
  );
}

import styles from "./game.module.css";

export default function Game() {
  return (
    <div className={styles.screen}>
      <iframe
        src="https://irizow.github.io/pkm-simulation/"
        allowFullScreen
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>
  );
}

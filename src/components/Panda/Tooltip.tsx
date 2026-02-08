import { Stats } from "./types";
import styles from "./panda.module.css";
import { SetStateAction } from "react";

interface TooltipProps {
  setTooltipOnScreen: (val: boolean) => void;
  stats: Stats;
  setStats: React.Dispatch<SetStateAction<Stats>>;
  setIsEating: React.Dispatch<SetStateAction<boolean>>;
  setIsSleeping: React.Dispatch<SetStateAction<boolean>>;
  setIsPlaying: React.Dispatch<SetStateAction<boolean>>;
}

export default function Tooltip({
  setTooltipOnScreen,
  stats,
  setStats,
  setIsEating,
  setIsPlaying,
  setIsSleeping,
}: TooltipProps) {
  return (
    <div className={styles.panda_tooltip}>
      <div className={styles.stats}>
        <div>Hunger: {Math.round(stats.hunger)}</div>
        <div>Energy: {Math.round(stats.energy)}</div>
        <div>Boredom: {Math.round(stats.boredom)}</div>
      </div>
      <div className={styles.button_row}>
        <button
          onClick={() => {
            setIsEating(true);
            setTooltipOnScreen(false);
            setStats((prevStats) => ({ ...prevStats, hunger: 0 }));
          }}
        >
          Feed
        </button>
        <button
          onClick={() => {
            setIsPlaying(true);
            setTooltipOnScreen(false);
            setStats((prevStats) => ({ ...prevStats, boredom: 0 }));
          }}
        >
          Play
        </button>
        <button
          onClick={() => {
            setIsSleeping(true);
            setTooltipOnScreen(false);
            setStats((prevStats) => ({ ...prevStats, energy: 100 }));
          }}
        >
          Sleep
        </button>
      </div>
    </div>
  );
}

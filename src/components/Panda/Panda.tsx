
import styles from './panda.module.css'
import { useEffect, useMemo, useState } from "react";
import WalkingPanda from './WalkingPanda.tsx';
import GreetingPanda from './GreetingPanda.tsx';
import HappyPanda from './HappyPanda.tsx';
import NeutralPanda from './NeutralPanda.tsx';
import UnwellPanda from './UnwellPanda.tsx';
import Tooltip from './Tooltip.tsx';
import { Stats } from './types.ts';
import ActionPanda from './ActionPanda.tsx';

export default function Panda() {
  const [isInMiddle, setIsInMiddle] = useState<boolean>(false);
  const [hasGreeted, setHasGreeted] = useState<boolean>(false);
  const [isTooltip, setIsTooltip] = useState<boolean>(false);
  const [tooltipOnScreen, setTooltipOnScreen] = useState<boolean>(false);
  const [isEating, setIsEating] = useState<boolean>(false);
  const [isSleeping, setIsSleeping] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const pandaInAction = isEating || isSleeping || isPlaying;
    const [stats, setStats] = useState<Stats>({
    hunger: 30, 
    energy: 100,  
    boredom: 20 
  });

  useEffect(() => {
    if(isTooltip) {
      setTooltipOnScreen(true);
    }
    else {
      const timer = setTimeout(() => {
        setTooltipOnScreen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isTooltip]);
  

   useEffect(() => {
  const interval = setInterval(() => {
    setStats((prev: Stats) => {
      const next = {
        hunger: Math.min(prev.hunger + 0.5, 100),
        energy: Math.max(prev.energy - 0.5, 0),
        boredom: Math.min(prev.boredom + 0.3, 100)
      };
      console.log('stats', next); 
       console.log('styles', styles)
      return next;
    });
  }, 2000);

  return () => clearInterval(interval);
}, []);



      useEffect(() => {
        const timer = setTimeout(() => {    
            setHasGreeted(true);
        }, 3500);
        return () => clearTimeout(timer);
    }, [])

    const shouldPandaBeNeutral = useMemo(() => {
  return stats.boredom > 50 || stats.energy < 50 || stats.hunger > 50;
}, [stats]);
    const isPandaUnwell = useMemo(() => {
  return stats.boredom > 80 || stats.energy < 30 || stats.hunger > 70;
}, [stats]);
    
    return (
      <div className={styles.panda_container} onMouseEnter={() => setIsTooltip(true)} onMouseLeave={() => setIsTooltip(false)}>
      {!isInMiddle ?
        <WalkingPanda setIsInMiddle={setIsInMiddle} />
        :
        !hasGreeted ?
        <GreetingPanda />
        :
        pandaInAction ?
        <ActionPanda isEating={isEating} setIsEating={setIsEating} isSleeping={isSleeping} setIsSleeping={setIsSleeping} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        :
        isPandaUnwell ?
        <UnwellPanda stats={stats} />
        :
        shouldPandaBeNeutral ?
        <NeutralPanda />
        :
        <HappyPanda />
        }
        {tooltipOnScreen && <Tooltip stats={stats} setTooltipOnScreen={setTooltipOnScreen} setStats={setStats} setIsEating={setIsEating} setIsSleeping={setIsSleeping} setIsPlaying={setIsPlaying} />}
        </div> 
    )
}
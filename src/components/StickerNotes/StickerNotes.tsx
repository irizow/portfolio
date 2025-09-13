import { useState } from 'react';
import styles from './stickernotes.module.css'
import { motion } from 'framer-motion';
import { notescontent } from './notescontent';
import { useIsMobile } from '../../hooks/useIsMobile';

interface StickerNote {
        id: number;
        text: string;
        color: string;
}

export default function StickerNotes() {
    const [notes, setNotes] = useState<StickerNote[]>(notescontent);
    const colors = ['var(--pastel-yellow)', 'var(--pastel-pink)', 'var(--pastel-green)', 'var(--pastel-blue)'];
    const isMobile = useIsMobile();

    if (isMobile) return null; 
    
  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto'; 
    el.style.height = `${el.scrollHeight}px`; 
  };

    function handleDelete(id: number) { 
        setNotes(notes.filter(note => note.id !== id));
    }

    function handleAddNewNote() {
        const newNote: StickerNote = {
            id: Date.now(),
            text: '',
            color: colors[Math.floor(Math.random() * colors.length)]
        };
        setNotes([...notes, newNote]);
    }
    console.log(notes)

    return (
        <>
        {notes.map((note, index) => (
                    <motion.div dragConstraints={{ top: 20, left: -1000, right: 20, bottom: 400 }} drag className={styles.sticker_note} style={{ backgroundColor: note.color, right: `${index + 1 * 2}rem`, top: `${index + 1 * 2}rem`}} key={note.id}>
            <header>
                <span onClick={handleAddNewNote}>+</span>
                <span onClick={() => handleDelete(note.id)} style={{transform: 'rotate(45deg)'}}>+</span>
            </header>
            <div>
                <textarea value={note.text} placeholder='Don´t you dare to forget...' onChange={(e) => {setNotes(notes.map(n => n.id === note.id ? { ...n, text: e.target.value } : n)); autoResize(e.target);}}></textarea>
            </div>
        </motion.div>
        ))}
        </>
    )
}
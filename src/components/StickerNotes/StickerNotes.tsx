import { useState } from 'react';
import styles from './stickernotes.module.css'
import { motion } from 'framer-motion';
import { notescontent } from './notescontent';

interface StickerNote {
        id: number;
        text: string;
        color: string;
}

export default function StickerNotes() {
    const [notes, setNotes] = useState<StickerNote[]>(notescontent);
    const colors = ['var(--pastel-yellow)', 'var(--pastel-pink)', 'var(--pastel-green)', 'var(--pastel-blue)'];

    
  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto'; // reset first
    el.style.height = `${el.scrollHeight}px`; // grow to fit content
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
                    <motion.div dragConstraints={{ top: 20, left: -1000, right: 20, bottom: 300 }} drag className={styles.sticker_note} style={{ backgroundColor: note.color, right: `${index + 1 * 2}rem`, top: `${index + 1 * 2}rem`}}>
            <header>
                <span onClick={handleAddNewNote}>+</span>
                <span onClick={() => handleDelete(note.id)} style={{transform: 'rotate(45deg)'}}>+</span>
            </header>
            <div>
                <textarea value={note.text} placeholder='Don´t forget about this...' onChange={(e) => {setNotes(notes.map(n => n.id === note.id ? { ...n, text: e.target.value } : n)); autoResize(e.target);}}></textarea>
            </div>
        </motion.div>
        ))}
        </>
    )
}
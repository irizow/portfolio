import React, { useState, useEffect } from "react";

export default function TypeWritter({ text, delay }) {
  const [currText, setCurrText] = useState('');
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    // Reset state when text prop changes
    setCurrText('');
    setCurrIndex(0);
  }, [text]);

  useEffect(() => {
    // Animate typing effect
    if (currText !== text) {
      const timeout = setTimeout(() => {
        setCurrText(prevText => prevText + text[currIndex]);
        setCurrIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currText, currIndex, delay, text]);

  return (
    <span>{currText}</span>
  );
}
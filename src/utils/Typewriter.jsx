import { useState, useEffect } from "react";

export default function TypeWritter({text, delay}) {
    const [currText, setCurrText] = useState('');
    const [currIndex, setCurrIndex] = useState(0);

    useEffect(() => {
        if(currText < text) {
            const timeout = setTimeout(()=> {
                setCurrText(prevText => prevText + text[currIndex]);
                setCurrIndex(prevIndex => prevIndex + 1)
            }, delay)

            return ()=> clearTimeout(timeout)
        }

    }, [currIndex, delay,text])

    return (
        <span>{currText}</span>
    )

}
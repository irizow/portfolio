import Desktop from "./components/Desktop/Desktop";
import { useState } from "react";
import "./App.css";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <>
      <Desktop darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
    </>
  );
}

export default App;

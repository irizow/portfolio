import CompScreen from './components/CompScreen/CompScreen'
import { useState } from 'react'
import './App.css'

function App() {
  const [darkTheme, setDarkTheme ] = useState(true)

  return (
    <>
      <CompScreen darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
    </>
  )
}

export default App

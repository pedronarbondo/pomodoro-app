import classes from './app.module.css';
import Header from "./Components/Header"
import PomodoroBlock from "./Components/PomodoroBlock"
import { useState } from "react"
 
function App() {
  return (
    <div 
    className={classes.main}> 
      <Header />
      <PomodoroBlock />
    </div>
  )
}

export default App;

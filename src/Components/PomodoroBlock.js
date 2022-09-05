import { useEffect, useState } from "react"
import classes from "./pomodoroBlock.module.css"
import alarm from "../assets/ducks.mp3"

export default function PomodoroBlock() {
    const [buttonActive, setButtonActive] = useState({
        "pomodoro": true,
        "shortBreak": false,
        "longBreak": false
    })
    const [minutes, setMinutes] = useState("25")
    const [seconds, setSeconds] = useState("00")
    const [start, setStart] = useState(false)
    const ducks = new Audio(alarm)

    function handleBgColor() {
        if (buttonActive.pomodoro) {
            return "salmon"
        } else if (buttonActive.shortBreak) {
            return "#80bfff"
        } else if (buttonActive.longBreak) {
            return "#0059b3"
        }
    }

    document.title = `${minutes}:${seconds} - ${buttonActive.pomodoro ? "Time to focus!" : "Break !"}`
    document.body.style.background = handleBgColor()

    useEffect(() => {
        let myInterval;
        if (start) {
            myInterval = setInterval(() => {
                if (seconds >= 10) {
                    setSeconds(seconds - 1)
                } else if (seconds < 10 && seconds > 0) {
                    setSeconds(`0${seconds - 1}`)
                }
                if (seconds == 0 && minutes > 0) {
                    if (minutes >= 10) {
                        setMinutes(minutes - 1)
                        setSeconds("59")
                    } else if (minutes < 10) {
                        setMinutes(`0${minutes - 1}`)
                        setSeconds("59")
                    }
                }
                if (seconds == 0 && minutes == 0) {
                    clearInterval(myInterval)
                    setStart(false)
                    setMinutes("25")
                    setSeconds("00")
                    ducks.play()
                }
            }, 1000)
            return () => {
                clearInterval(myInterval);
            }
        }
    }, [start, seconds]
    )


    function handleStart() {
        setStart(prevStart => !prevStart)
    }

    function handleClick(id) {
        switch (id) {
            case "pomodoro":
                setButtonActive({
                    "pomodoro": true,
                    "shortBreak": false,
                    "longBreak": false
                })
                setMinutes("25")
                setSeconds("00")
                setStart(false)
                break;
            case "shortBreak": {
                setButtonActive({
                    "pomodoro": false,
                    "shortBreak": true,
                    "longBreak": false
                })
                setMinutes("05")
                setSeconds("00")
                setStart(false)
                break;
            }
            case "longBreak": {
                setButtonActive({
                    "pomodoro": false,
                    "shortBreak": false,
                    "longBreak": true
                })
                setMinutes("15")
                setSeconds("00")
                setStart(false)
                break;
            }
        }
    }
    function actionText(buttonStates) {
        if (buttonStates.pomodoro) {
            return "Time to focus!"
        } else if (buttonStates.longBreak || buttonStates.shortBreak) {
            return "Time for a break."
        }
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.pomodoroContainer}>
                <div>
                    <ul className={classes.ulItems}>
                        <button className=
                            {`${classes.button} ${buttonActive.pomodoro ? classes.buttonClicked : ""}`}
                            onClick={() => handleClick("pomodoro")}
                        >Pomodoro</button>
                        <button className=
                            {`${classes.button} ${buttonActive.shortBreak ? classes.buttonClicked : ""}`}
                            onClick={() => handleClick("shortBreak")}
                        >Short Break</button>
                        <button className=
                            {`${classes.button} ${buttonActive.longBreak ? classes.buttonClicked : ""}`}
                            onClick={() => handleClick("longBreak")}
                        >Long Break</button>
                    </ul>
                </div>
                <div><p className={classes.timeText}>{minutes}:{seconds}</p></div>
                <div><button className={classes.startButton} onClick={() => handleStart()}>{start ? "STOP" : "START"}</button></div>
            </div>
            <p className={classes.actionText}>{actionText(buttonActive)}</p>
        </div>
    )
}
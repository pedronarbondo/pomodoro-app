import classes from "./header.module.css"

export default function Header() {
    return (
        <div>
            <div className={classes.header}>
                <div className="header--left">
                    <p className={classes.title}>Pomodoro Timer</p>
                </div>
                <div>
                    <ul className={classes.headerRightUl}>
                        <li className={classes.ulItem}>Report</li>
                        <li className={classes.ulItem}>Settings</li>
                        <li className={classes.ulItem}>Login</li>
                    </ul>
                </div>
            </div>
            <hr className={classes.lineBreak}></hr>
        </div>
    )
}
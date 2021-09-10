import React, {FC, MouseEventHandler} from "react";

import logo from "../../assets/logo.png";
import github from "../../assets/github.png";

import styles from "./Taskbar.module.scss";

interface TaskbarProps {
  handleStart: MouseEventHandler;
}

const Taskbar: FC<TaskbarProps> = ({handleStart}) => {
  return (
    <header className={`${styles.taskbar} window`}>
      {/* <div className="title-bar">
          <div className="title-bar-text">A Window With Stuff In It</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div> */}
      <nav className={`${styles["taskbar--content"]} window-body`}>
        <button className={styles["taskbar--start"]} onClick={handleStart}>
          <img className={styles["windows-logo"]} src={logo} />
          Start
        </button>
        <hr />
        <a
          className={styles["taskbar--icon"]}
          href="https://github.com/justkahdri"
          referrerPolicy="no-referrer"
          rel="noreferrer"
          target="_blank"
        >
          <img src={github} />
        </a>
      </nav>
    </header>
  );
};

export default Taskbar;

import React, {FC, MouseEventHandler, useEffect, useRef, useState} from "react";

import logo from "../../assets/logo.png";
import sound from "../../assets/loudspeaker_rays-0.png";
import miniWindows from "../../assets/accessibility_two_windows.png";

import styles from "./Taskbar.module.scss";
import {Apps} from "./constants";

interface TaskbarProps {
  handleStart: MouseEventHandler;
}

const Taskbar: FC<TaskbarProps> = ({handleStart}) => {
  const [time, setTime] = useState<string>();
  const timeInterval = useRef<number>();

  useEffect(() => {
    const dateFormat = new Intl.DateTimeFormat("en", {
      timeStyle: "short",
    });

    setTime(dateFormat.format(Date.now()));

    timeInterval.current = setInterval(() => {
      setTime(dateFormat.format(Date.now()));
    }, 60000);

    return () => {
      clearInterval(timeInterval.current);
    };
  }, []);

  return (
    <header className={`${styles.taskbar} window`}>
      <nav className={`${styles["taskbar__content"]} window-body`}>
        <div>
          <button className={styles["taskbar__start"]} onClick={handleStart}>
            <img className={styles["windows-logo"]} src={logo} />
            Start
          </button>
          <hr />

          {Apps.map(({link, icon, isExternal, name}) =>
            isExternal ? (
              <a
                key={name}
                aria-label={name}
                className={styles["taskbar__icon"]}
                href={link}
                referrerPolicy="no-referrer"
                rel="noreferrer"
                target="_blank"
              >
                <img src={icon} />
              </a>
            ) : (
              <a key={name} aria-label={name} className={styles["taskbar__icon"]} href={link}>
                <img src={icon} />
              </a>
            ),
          )}
          <hr />
        </div>
        <div>
          <hr />
          <div className="status-bar">
            <p className={`${styles["taskbar__info"]} status-bar-field`}>
              <img alt="mini-windows" src={miniWindows} />
              <img alt="sound-icon" src={sound} />
              {time}
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Taskbar;

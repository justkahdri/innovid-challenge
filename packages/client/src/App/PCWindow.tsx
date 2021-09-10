import React, {FC, useState, useEffect, useRef} from "react";

import getServerData from "../utils/getServerData";
import turnedOn from "../assets/pc-on.gif";
import turnedOff from "../assets/pc-off.png";

import styles from "./PCWindow.module.scss";

const PCWindow: FC<{serverId: number}> = ({serverId}) => {
  const [isOnline, setIsOnline] = useState(false);
  const [load, setLoad] = useState<number>();

  const updater = useRef<number>();

  useEffect(() => {
    if (isOnline) {
      getServerData(serverId).then((res) => setLoad(res));
    } else {
      clearInterval(updater.current);
    }
    const i = setInterval(() => {
      if (isOnline) {
        getServerData(serverId).then((res) => setLoad(res));
      }
    }, 1500);

    updater.current = i;
  }, [isOnline, serverId]);

  // Cleans interval on dismount
  useEffect(() => {
    return () => {
      setIsOnline(false);
      clearInterval(updater.current);
    };
  }, []);

  return (
    <section className={`${styles.window} window`}>
      <div className="title-bar">
        <div className="title-bar-text">Server #{serverId}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body">
        {isOnline ? (
          <img alt="computer" className={styles.computer} src={turnedOn} />
        ) : (
          <img alt="computer" className={styles.computer} src={turnedOff} />
        )}
      </div>
      <div className={`status-bar `}>
        <p className={`${styles.field} status-bar-field`}>Satus: {isOnline ? "ON" : "OFF"}</p>
        <p
          className={`${styles.field} ${styles["field--btn"]} status-bar-field`}
          onClick={() => setIsOnline((prev) => !prev)}
        >
          {isOnline ? "shut down" : "turn on"}
        </p>
        <p className="status-bar-field">CPU Usage: {load || "..."}%</p>
      </div>
    </section>
  );
};

export default PCWindow;

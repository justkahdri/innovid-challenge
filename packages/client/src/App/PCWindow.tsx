import React, {FC, useState, useEffect, useRef} from "react";

import turnedOn from "../assets/pc-on.gif";
import turnedOff from "../assets/pc-off.png";

import styles from "./PCWindow.module.scss";

type ServerData = {
  load: number;
  id: number;
};

const getServerData = async (id: number) => {
  const response = await fetch(`http://localhost:8000/status/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status == 200) {
    const parsedResponse: ServerData = await response.json();

    return parsedResponse.load;
  } else {
    console.error(`Failed to fetch on Server #${id}: code ${response.status}`);
  }
};

const PCWindow: FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [load, setLoad] = useState<number>();

  const updater = useRef<number>();

  useEffect(() => {
    if (isOnline) {
      getServerData(1).then((res) => setLoad(res));
    } else {
      clearInterval(updater.current);
    }
    const i = setInterval(() => {
      if (isOnline) {
        getServerData(1).then((res) => setLoad(res));
      }
    }, 1000);

    updater.current = i;
  }, [isOnline]);

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
        <div className="title-bar-text">Server #1</div>
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

import React, {FC, useState, useEffect, useRef} from "react";
import {motion} from "framer-motion";

import getServerData from "../../utils/getServerData";
import turnedOn from "../../assets/pc-on.gif";
import turnedOff from "../../assets/pc-off.png";

import styles from "./PCWindow.module.scss";

interface PCWindowProps {
  onClose: (id: number) => void;
  serverId: number;
  title: string;
  dragConstraints?: React.RefObject<Element>;
}

const PCWindow: FC<PCWindowProps> = ({onClose, title, serverId, dragConstraints}) => {
  const [isOnline, setIsOnline] = useState(false);
  const [load, setLoad] = useState<number>();

  const key = `server#${serverId}-status`;
  const updater = useRef<number>();

  const toggleServerStatus = () => {
    setIsOnline((isOnline) => {
      window.localStorage.setItem(key, JSON.stringify(!isOnline));

      return !isOnline;
    });
  };

  // Fetching data on online change
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
    }, 5000);

    updater.current = i;
  }, [isOnline, serverId]);

  // First data load and cleaning on dismount
  useEffect(() => {
    // Loads server status from localStorage.
    const saved_status = window.localStorage.getItem(key);

    if (saved_status && JSON.parse(saved_status)) {
      setIsOnline(true);
    }

    // Cleans interval on dismount
    return () => {
      setIsOnline(false);
      clearInterval(updater.current);
    };
  }, [key]);

  return (
    <motion.div
      drag
      animate={{scale: 1}}
      dragConstraints={dragConstraints}
      dragElastic={false}
      dragMomentum={false}
      exit={{scale: 0}}
      initial={{scale: 0}}
      style={{width: "fit-content", height: "fit-content"}}
    >
      <section className={`${styles.window} window`}>
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button
              aria-label="Close"
              onClick={() => onClose(serverId)}
              onKeyPress={(e) => ["Enter", "Space"].includes(e.code) && onClose(serverId)}
            />
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
            onClick={toggleServerStatus}
          >
            {isOnline ? "shut down" : "turn on"}
          </p>
          <p className="status-bar-field">CPU Usage: {load || "..."}%</p>
        </div>
      </section>
    </motion.div>
  );
};

export default PCWindow;

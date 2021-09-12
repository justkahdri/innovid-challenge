import React, {useRef, useState} from "react";
import {AnimatePresence} from "framer-motion";

import PCWindow from "./Desktop/PCWindow";
import styles from "./App.module.scss";
import Taskbar from "./Taskbar";

interface Server {
  name: string;
  id: number;
  mounted: boolean;
}

const App: React.FC = () => {
  const [servers, setServers] = useState(
    Array(4)
      .fill("")
      .map((_, i) => ({name: `Server #${i + 1}`, id: i + 1, mounted: true})),
  );
  const toggleServers = () => {
    // TODO
    console.log("Should run all servers...");
  };

  const dragZone = useRef(null);

  const handleOnClose = (id: number) => {
    setServers((prev) => {
      let selected = prev.find((s) => s.id === id) as Server;

      selected = {...selected, mounted: false};

      return [...prev.filter((server) => server.id !== id), selected];
    });
  };

  return (
    <div className={styles.container}>
      <main ref={dragZone} className={styles.desktop}>
        <AnimatePresence>
          {servers.map(
            ({id, name, mounted}) =>
              mounted && (
                <PCWindow
                  key={name}
                  dragConstraints={dragZone}
                  serverId={id}
                  title={name}
                  onClose={handleOnClose}
                />
              ),
          )}
        </AnimatePresence>
      </main>
      <Taskbar handleStart={toggleServers} />
    </div>
  );
};

export default App;

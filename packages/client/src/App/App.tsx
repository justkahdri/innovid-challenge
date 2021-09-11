import * as React from "react";

import PCWindow from "./Desktop/PCWindow";
import styles from "./App.module.scss";
import Taskbar from "./Taskbar";

const App: React.FC = () => {
  const servers = Array(4)
    .fill("")
    .map((_, i) => ({name: `Server${i + 1}`, id: i + 1}));
  const toggleServers = () => {
    // TODO
    console.log("Should run all servers...");
  };

  return (
    <div className={styles.container}>
      <main className={styles.desktop}>
        {servers.map(({id, name}) => (
          <PCWindow key={name} serverId={id} />
        ))}
      </main>
      <Taskbar handleStart={toggleServers} />
    </div>
  );
};

export default App;

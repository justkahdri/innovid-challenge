import * as React from "react";

import PCWindow from "./Desktop/PCWindow";
import styles from "./App.module.scss";
import Taskbar from "./Taskbar";

const App: React.FC = () => {
  const toggleServers = () => {
    alert("Toggle");
  };

  return (
    <div className={styles.container}>
      <main className={styles.desktop}>
        {Array(4)
          .fill("")
          .map((_, i) => (
            <PCWindow key={i + 1} serverId={i + 1} />
          ))}
      </main>
      <Taskbar handleStart={toggleServers} />
    </div>
  );
};

export default App;

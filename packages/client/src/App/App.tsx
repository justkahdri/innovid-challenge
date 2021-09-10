import * as React from "react";

import PCWindow from "./PCWindow";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <main className={styles.container}>
      {Array(4)
        .fill("")
        .map((_, i) => (
          <PCWindow key={i + 1} serverId={i + 1} />
        ))}
    </main>
  );
};

export default App;

import * as React from "react";

import PCWindow from "./PCWindow";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <main className={styles.container}>
      <PCWindow />
    </main>
  );
};

export default App;

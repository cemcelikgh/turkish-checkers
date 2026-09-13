import FileLabels from "@/components/file-labels/FileLabels";
import Game from "@/components/game/Game";
import ResetGameConfirmModal
  from "@/components/reset-game-confirm-modal/ResetGameConfirmModal";
import StoreProvider from "./StoreProvider";
import styles from "./page.module.css";

function Home() {
  return (
    <main className={styles.main}>
    <StoreProvider>
      <ResetGameConfirmModal />
      <Game />
      <FileLabels />
    </StoreProvider>
    </main>
  );
}

export default Home;

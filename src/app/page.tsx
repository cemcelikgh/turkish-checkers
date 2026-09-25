import FileLabels from "@/components/file-labels/FileLabels";
import Game from "@/components/game/Game";
import ResetGameConfirmationModal
  from "@/components/reset-game-confirmation-modal/ResetGameConfirmationModal";
import StoreProvider from "./StoreProvider";
import styles from "./page.module.css";

function Home() {
  return (
    <main className={styles.main}>
    <StoreProvider>
      <ResetGameConfirmationModal />
      <Game />
      <FileLabels />
    </StoreProvider>
    </main>
  );
}

export default Home;

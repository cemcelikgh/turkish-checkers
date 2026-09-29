import BottomBar from "@/components/bottom-bar/BottomBar";
import Game from "@/components/game/Game";
import styles from "./page.module.css";

function Home() {
  return (
    <main className={styles.main}>
      <Game />
      <BottomBar />
    </main>
  );
}

export default Home;

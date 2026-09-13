import Board from "@/components/game/board/Board";
import LeftRankLabels
  from "@/components/game/left-rank-labels/LeftRankLabels";
import RightRankLabels
  from "@/components/game/right-rank-labels/RightRankLabels";
import GamePanel from "@/components/game/game-panel/GamePanel";
import styles from "./Game.module.css";

function Game() {
  return (
    <div className={styles.game}>
      <LeftRankLabels />
      <Board isWhiteSideBoard={true} />
      <GamePanel />
      <Board isWhiteSideBoard={false} />
      <RightRankLabels />
    </div>
  );
}

export default Game;

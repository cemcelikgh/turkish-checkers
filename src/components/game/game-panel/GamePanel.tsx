import CapturedBlackPiecess
  from "./captured-black-pieces/CapturedBlackPieces";
import CapturedWhitePieces
  from "./captured-white-pieces/CapturedWhitePieces";
import DrawOfferButton
  from "./draw-offer-button/DrawOfferButton";
import ResetGameButton
  from "./reset-game-button/ResetGameButton";
import TurnIndicator
  from "./turn-indicator/TurnIndicator";
import styles from "./GamePanel.module.css";

function GamePanel() {
  return (
    <div className={styles["game-panel"]}>
      <ResetGameButton />
      <DrawOfferButton />
      <TurnIndicator />
      <CapturedBlackPiecess />
      <CapturedWhitePieces />
    </div>
  );
}

export default GamePanel;

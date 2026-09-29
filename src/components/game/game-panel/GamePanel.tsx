import CapturedBlackPiecess
  from "./captured-black-pieces/CapturedBlackPieces";
import CapturedWhitePieces
  from "./captured-white-pieces/CapturedWhitePieces";
import DrawOfferButton
  from "./draw-offer-button/DrawOfferButton";
import FullscreenButton
  from "./fullscreen-button/FullscreenButton";
import TurnIndicator
  from "./turn-indicator/TurnIndicator";
import styles from "./GamePanel.module.css";

function GamePanel() {
  return (
    <div className={styles["game-panel"]}>
      <FullscreenButton />
      <DrawOfferButton />
      <TurnIndicator />
      <CapturedBlackPiecess />
      <CapturedWhitePieces />
    </div>
  );
}

export default GamePanel;

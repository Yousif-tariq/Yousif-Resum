import {useContext} from "react";
import {usePortfolio} from "../../contexts/PortfolioContext";
import StyleContext from "../../contexts/StyleContext";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import "./SplashScreen.scss";

export default function SplashScreen() {
  const {isDark} = useContext(StyleContext);
  const {greeting, splashScreen} = usePortfolio();
  return (
    <div className={isDark ? "dark-mode splash-container" : "splash-container"}>
      <div className="splash-animation-container">
        <DisplayLottie animationData={splashScreen.animation} />
      </div>
      <div className="splash-title-container">
        <span className="grey-color"> &lt;</span>
        <span className="splash-title">{greeting.username}</span>
        <span className="grey-color">/&gt;</span>
      </div>
    </div>
  );
}

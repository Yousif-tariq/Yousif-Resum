import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";
import {usePortfolio} from "../../contexts/PortfolioContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  const {contactInfo} = usePortfolio();
  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <div className="ascii-art">
          {`                       *##1111##
                     #00000000000*
                    10000000000101
                    000001#******#
                    000001   **#**
                    10000##1000000#
                     0001*#1000**0*
                     *1101##101##0*
                      *00000000000
                       0000000000*
                   *11  100000000*
              **#10001   *10001 1001#*
         **#1100000000    *101# #0000000#*
        00010000000000# #000000##0000000001
       *000000000000000 *110000110000000000
       1000000000000000*  *0001*10000000000
       00000000000000001  *0000#10000000000
      *00000000000000000  10000##0000000000
      100000000000000000**00000# 0000000000
     #0000000000000000000*#0000# 0000100000
    #00000000000000000000000000##0000000000
   *000000000000000000000000000100000000000*
   0000000010000000000000000000000000000000#`}
        </div>
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {emoji("Made with ❤️ by Yousif Tariq")}
        </p>
      </div>
    </Fade>
  );
}

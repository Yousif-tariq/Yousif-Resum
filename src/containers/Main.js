import React, {useEffect, useState} from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Footer from "../components/footer/Footer";
import Talks from "./talks/Talks";
import Podcast from "./podcast/Podcast";
import Education from "./education/Education";
import ScrollToTopButton from "./topbutton/Top";
import Twitter from "./twitter-embed/twitter";
import Profile from "./profile/Profile";
import SplashScreen from "./splashScreen/SplashScreen";
import {StyleProvider} from "../contexts/StyleContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {usePortfolio} from "../contexts/PortfolioContext";
import "./Main.scss";

const Main = () => {
  const portfolioData = usePortfolio();
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  useEffect(() => {
    if (portfolioData.splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        portfolioData.splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    } else {
      setIsShowingSplashAnimation(false);
    }
  }, [portfolioData.splashScreen.enabled, portfolioData.splashScreen.duration]);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        {isShowingSplashAnimation && portfolioData.splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            {portfolioData.greeting.displayGreeting && <Greeting />}
            {portfolioData.skillsSection.display && <Skills />}
            {portfolioData.techStack.viewSkillBars && <StackProgress />}
            {portfolioData.educationInfo.display && <Education />}
            {portfolioData.workExperiences.display && <WorkExperience />}
            {portfolioData.bigProjects.display && <Projects />}
            <StartupProject />
            {portfolioData.achievementSection.display && <Achievement />}
            {portfolioData.blogSection.display && <Blogs />}
            {portfolioData.talkSection.display && <Talks />}
            {portfolioData.twitterDetails.display && <Twitter />}
            {portfolioData.podcastSection.display && <Podcast />}
            <Profile />
            <Footer />
            <ScrollToTopButton />
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;

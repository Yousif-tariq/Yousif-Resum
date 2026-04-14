import React, { createContext, useContext } from "react";
import * as PortfolioData from "../portfolio";
import { useLocalStorage } from "../hooks/useLocalStorage";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  // We use the entire object from portfolio.js as initial state
  const [portfolioData, setPortfolioData] = useLocalStorage("portfolioData", {
    greeting: PortfolioData.greeting,
    socialMediaLinks: PortfolioData.socialMediaLinks,
    skillsSection: PortfolioData.skillsSection,
    educationInfo: PortfolioData.educationInfo,
    techStack: PortfolioData.techStack,
    workExperiences: PortfolioData.workExperiences,
    openSource: PortfolioData.openSource,
    bigProjects: PortfolioData.bigProjects,
    achievementSection: PortfolioData.achievementSection,
    blogSection: PortfolioData.blogSection,
    talkSection: PortfolioData.talkSection,
    podcastSection: PortfolioData.podcastSection,
    contactInfo: PortfolioData.contactInfo,
    twitterDetails: PortfolioData.twitterDetails,
    isHireable: PortfolioData.isHireable,
    resumeSection: PortfolioData.resumeSection,
    splashScreen: PortfolioData.splashScreen,
    illustration: PortfolioData.illustration
  });

  const updateSection = (sectionName, newData) => {
    setPortfolioData(prev => ({
      ...prev,
      [sectionName]: newData
    }));
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to reset all changes to default?")) {
      window.localStorage.removeItem("portfolioData");
      window.location.reload();
    }
  };

  return (
    <PortfolioContext.Provider value={{ ...portfolioData, updateSection, resetToDefault }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

export default PortfolioContext;

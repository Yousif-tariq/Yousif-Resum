import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { usePortfolio } from "../contexts/PortfolioContext";
import "./Admin.scss";

const AdminDashboard = () => {
  const portfolio = usePortfolio();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("greeting");
  const [localData, setLocalData] = useState(portfolio);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      history.push("/login");
    }
  }, [history]);

  useEffect(() => {
    setLocalData(portfolio);
  }, [portfolio, activeTab]);

  const handleInputChange = (section, field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedArrayChange = (section, arrayName, index, field, value) => {
    const newArray = [...localData[section][arrayName]];
    newArray[index] = { ...newArray[index], [field]: value };
    handleInputChange(section, arrayName, newArray);
  };

  const handleAddArrayItem = (section, arrayName, template) => {
    const newArray = [...localData[section][arrayName], template];
    handleInputChange(section, arrayName, newArray);
  };

  const handleRemoveArrayItem = (section, arrayName, index) => {
    const newArray = localData[section][arrayName].filter((_, i) => i !== index);
    handleInputChange(section, arrayName, newArray);
  };

  const handleSave = () => {
    Object.keys(localData).forEach(section => {
      if (typeof portfolio.updateSection === 'function') {
        portfolio.updateSection(section, localData[section]);
      }
    });
    alert("Full Portfolio Saved Locally!");
  };

  const handleExport = () => {
    const exportContent = `export const portfolioData = ${JSON.stringify(localData, null, 2)};`;
    const blob = new Blob([exportContent], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio_complete.js";
    link.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    history.push("/login");
  };

  const renderTabs = () => {
    const tabs = [
      { id: "greeting", label: "Greeting", icon: "👋" },
      { id: "socialMediaLinks", label: "Social", icon: "🔗" },
      { id: "skillsSection", label: "Skills", icon: "⚡" },
      { id: "workExperiences", label: "Experience", icon: "💼" },
      { id: "educationInfo", label: "Education", icon: "🎓" },
      { id: "bigProjects", label: "Projects", icon: "🚀" },
      { id: "achievementSection", label: "Achievements", icon: "🏆" },
      { id: "media", label: "Media", icon: "📺" },
      { id: "system", label: "System", icon: "⚙️" }
    ];

    return tabs.map(tab => (
      <div 
        key={tab.id} 
        className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
        onClick={() => setActiveTab(tab.id)}
      >
        <span>{tab.icon}</span> {tab.label}
      </div>
    ));
  };

  const renderForm = () => {
    switch (activeTab) {
      case "greeting":
        return (
          <div className="admin-card">
            <h3>Greeting Section</h3>
            <div className="admin-form-group">
               <label>Enable Splash Screen</label>
               <select value={localData.splashScreen.enabled} onChange={(e) => handleInputChange("splashScreen", "enabled", e.target.value === "true")}>
                 <option value="true">Yes</option>
                 <option value="false">No</option>
               </select>
            </div>
            <div className="admin-form-group">
              <label>Name</label>
              <input value={localData.greeting.username} onChange={(e) => handleInputChange("greeting", "username", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Headline</label>
              <input value={localData.greeting.title} onChange={(e) => handleInputChange("greeting", "title", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Brief Bio</label>
              <textarea value={localData.greeting.subTitle} onChange={(e) => handleInputChange("greeting", "subTitle", e.target.value)} />
            </div>
          </div>
        );
      case "educationInfo":
        return (
          <div className="admin-card">
            <h3>Education History</h3>
            {localData.educationInfo.schools.map((school, idx) => (
              <div key={idx} className="array-item">
                <button className="btn-remove" onClick={() => handleRemoveArrayItem("educationInfo", "schools", idx)}>Remove</button>
                <div className="admin-form-group">
                  <label>Institution</label>
                  <input value={school.schoolName} onChange={(e) => handleNestedArrayChange("educationInfo", "schools", idx, "schoolName", e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Degree</label>
                  <input value={school.subHeader} onChange={(e) => handleNestedArrayChange("educationInfo", "schools", idx, "subHeader", e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Duration</label>
                  <input value={school.duration} onChange={(e) => handleNestedArrayChange("educationInfo", "schools", idx, "duration", e.target.value)} />
                </div>
              </div>
            ))}
            <button className="btn-add" onClick={() => handleAddArrayItem("educationInfo", "schools", { schoolName: "New School", subHeader: "Degree Name", duration: "2020-2024", desc: "", descBullets: [] })}>
              + Add School
            </button>
          </div>
        );
      case "achievementSection":
        return (
          <div className="admin-card">
            <h3>Certifications & Achievements</h3>
            <div className="admin-form-group">
              <label>Section Title</label>
              <input value={localData.achievementSection.title} onChange={(e) => handleInputChange("achievementSection", "title", e.target.value)} />
            </div>
            {localData.achievementSection.achievementsCards.map((card, idx) => (
              <div key={idx} className="array-item">
                <button className="btn-remove" onClick={() => handleRemoveArrayItem("achievementSection", "achievementsCards", idx)}>Remove</button>
                <div className="admin-form-group">
                  <label>Achievement Title</label>
                  <input value={card.title} onChange={(e) => handleNestedArrayChange("achievementSection", "achievementsCards", idx, "title", e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Subtitle / Issuer</label>
                  <input value={card.subtitle} onChange={(e) => handleNestedArrayChange("achievementSection", "achievementsCards", idx, "subtitle", e.target.value)} />
                </div>
              </div>
            ))}
             <button className="btn-add" onClick={() => handleAddArrayItem("achievementSection", "achievementsCards", { title: "New Certificate", subtitle: "Issuer Name", image: "", imageAlt: "certificate", footerLink: [] })}>
              + Add Achievement
            </button>
          </div>
        );
      case "media":
        return (
          <div className="admin-card">
            <h3>Media & Social Settings</h3>
            <div className="admin-form-group">
              <label>Twitter Username</label>
              <input value={localData.twitterDetails.userName} onChange={(e) => handleInputChange("twitterDetails", "userName", e.target.value)} />
            </div>
            <div className="admin-form-group">
               <label>Open for Hire</label>
               <select value={localData.isHireable} onChange={(e) => setLocalData(prev => ({ ...prev, isHireable: e.target.value === "true" }))}>
                 <option value="true">Yes</option>
                 <option value="false">No</option>
               </select>
            </div>
          </div>
        );
      case "system":
        return (
          <div className="admin-card">
            <h3>System Controls</h3>
            <p>Full control over the entire portfolio data structure.</p>
            <div className="admin-actions">
               <button className="btn-save" onClick={handleSave}>Apply Changes</button>
               <button className="btn-export" onClick={handleExport}>Download Full JS</button>
               <button className="btn-reset" onClick={() => portfolio.resetToDefault()}>Reset Everything</button>
            </div>
          </div>
        );
      default:
        return <p>Select a tab to manage that specific content section.</p>;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h1>💼 Gentleman Admin</h1>
        </div>
        {renderTabs()}
        <div className="nav-item" onClick={handleLogout} style={{marginTop: 'auto', color: '#ff4d4d'}}>
          <span>🚪</span> Logout
        </div>
      </div>
      <div className="admin-content">
        <div className="section-header">
          <h2>{activeTab.toUpperCase()} EDITOR</h2>
          <p>You have full control over the content displayed on your portfolio.</p>
        </div>
        {renderForm()}
      </div>
    </div>
  );
};

export default AdminDashboard;

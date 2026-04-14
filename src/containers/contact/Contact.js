import React, {useContext, useState} from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import {illustration, contactInfo} from "../../portfolio";
import {Fade} from "react-reveal";
import email from "../../assets/lottie/email";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";

export default function Contact() {
  const {isDark} = useContext(StyleContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleQuickContactSubmit = () => {
    if (!formData.name || !formData.message) {
      alert("Please enter your name and message at least.");
      return;
    }
    const text = `Name: ${formData.name}%0AContact: ${formData.email}%0AMessage: ${formData.message}`;
    const waNumber = contactInfo.number ? contactInfo.number.replace(/\D/g,'') : '';
    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
    setIsModalOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main contact-margin-top" id="contact">
        <div className="contact-div-main">
          <div className="contact-header">
            <h1 className="heading contact-title">{contactInfo.title}</h1>
            <p
              className={
                isDark
                  ? "dark-mode contact-subtitle"
                  : "subTitle contact-subtitle"
              }
            >
              {contactInfo.subtitle}
            </p>
            <div
              className={
                isDark ? "dark-mode contact-text-div" : "contact-text-div"
              }
            >
              {contactInfo.number && (
                <>
                  <a
                    className="contact-detail"
                    href={"tel:" + contactInfo.number}
                  >
                    {contactInfo.number}
                  </a>
                  <br />
                  <br />
                </>
              )}
              <a
                className="contact-detail-email"
                href={"mailto:" + contactInfo.email_address}
              >
                {contactInfo.email_address}
              </a>
              <br />
              <br />
              <SocialMedia />
              <div style={{ marginTop: "40px", position: "relative", display: "inline-block" }}>
                <button 
                  className="keyboard-btn"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  Quick Contact
                </button>
                {isModalOpen && (
                  <div className={isDark ? "contact-popover dark-mode-modal" : "contact-popover"}>
                    <button className="close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
                    <h3 style={{marginTop: 0, marginBottom: '15px', fontSize: '18px'}}>Drop a Message</h3>
                    <input 
                      type="text" 
                      placeholder="Name" 
                      className="popover-input"
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                    <input 
                      type="text" 
                      placeholder="Phone or Email" 
                      className="popover-input"
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                    />
                    <textarea 
                      placeholder="Write your message..." 
                      className="popover-input popover-textarea"
                      rows="3"
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                    <button className="submit-btn popover-submit" onClick={handleQuickContactSubmit}>
                      <i className="fab fa-whatsapp"></i> Send via WhatsApp
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="contact-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={email} />
            ) : (
              <img
                alt="Man working"
                src={require("../../assets/images/contactMailDark.svg")}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}

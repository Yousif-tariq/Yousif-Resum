/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Yousif Tariq",
  title: "Hi all, I'm Yousif",
  subTitle: emoji(
    "Results-driven Operations Supervisor with over 4 years of experience in parking and valet operations, currently working within the Easy Parking environment. Proven ability to manage large teams, improve operational efficiency, and deliver high-quality customer service."
  ),
  resumeLink: "",
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/yousif-abdullah",
  gmail: "yousif.tariq@hotmail.com",
  gitlab: "https://gitlab.com/",
  facebook: "https://facebook.com/",
  twitter: "https://twitter.com/",
  instagram: "https://instagram.com/",
  medium: "https://medium.com/",
  stackoverflow: "https://stackoverflow.com/",
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "OPERATIONS EXPERT & ANALYST WITH TECHNICAL SKILLS",
  skills: [
    emoji("⚡ Deep understanding of parking and valet operations systems"),
    emoji("⚡ Experience within Easy Parking projects (Jabal Omar)"),
    emoji("⚡ Leadership of 40+ employees in high-pressure environments"),
    emoji("⚡ Strong analytical and reporting skills using Python and Excel"),
    emoji("⚡ Ability to improve efficiency and reduce operational issues")
  ],

  softwareSkills: [
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "SQL Database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "Linux",
      fontAwesomeClassname: "fab fa-linux"
    },
    {
      skillName: "Excel / Power BI",
      fontAwesomeClassname: "fas fa-chart-bar"
    },
    {
      skillName: "Cybersecurity",
      fontAwesomeClassname: "fas fa-shield-alt"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "University",
      logo: require("./assets/images/harvardLogo.png"), // Kept placeholder
      subHeader: "Bachelor of Computer Science",
      duration: "3 years completed",
      desc: "Courses included Programming, Database, and Cybersecurity.",
      descBullets: []
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Operations Management", //Insert stack or technology you have experience in
      progressPercentage: "95%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Data Analysis (Excel, Power BI)",
      progressPercentage: "85%"
    },
    {
      Stack: "Python (Automation & Reporting)",
      progressPercentage: "80%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Parking Site Supervisor",
      company: "Easy Parking (Jabal Omar)",
      companylogo: require("./assets/images/management_icon.png"), // Management icon
      date: "Dec 2021 – Present",
      desc: "Managed daily operations at Jabal Omar project under Easy Parking system.",
      descBullets: [
        "Improved operational efficiency by 20% through better coordination and reporting",
        "Supervised 40+ employees and ensured adherence to company standards",
        "Acted as a key link between management and field teams"
      ]
    },
    {
      role: "Valet Operations Supervisor",
      company: "Easy Parking",
      companylogo: require("./assets/images/operations_icon.png"), // Operations icon
      date: "Previous Role",
      desc: "Ensured smooth valet operations with 95% customer satisfaction.",
      descBullets: [
        "Managed staff schedules and performance monitoring",
        "Maintained high service quality aligned with company standards"
      ]
    },
    {
      role: "Control Room Operator",
      company: "Easy Parking System",
      companylogo: require("./assets/images/coding_icon.png"), // Coding experience icon
      date: "Previous Role",
      desc: "Monitored system operations and improved efficiency by 25%.",
      descBullets: [
        "Generated daily operational and financial reports",
        "Responded to system alerts and coordinated with field teams"
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "false", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME PROECTS THAT I HELPED TO CREATE",
  projects: [],
  display: false // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Certifications 🏆 "),
  subtitle: "Professional Certifications, Training, and Courses.",

  achievementsCards: [
    {
      title: "Cybersecurity Fundamentals",
      subtitle: "Fundamentals of Cybersecurity and Networking",
      image: require("./assets/images/codeInLogo.webp"),
      imageAlt: "Cybersecurity",
      footerLink: []
    },
    {
      title: "Programming Certificate",
      subtitle: "Development and Programming Certificate",
      image: require("./assets/images/pwaLogo.webp"),
      imageAlt: "Programming",
      footerLink: []
    },
    {
      title: "OSHA Safety Certificate",
      subtitle: "Occupational Safety Training",
      image: require("./assets/images/googleAssistantLogo.webp"),
      imageAlt: "OSHA",
      footerLink: []
    },
    {
      title: "Leadership Training",
      subtitle: "Team Leadership and Management",
      image: require("./assets/images/codeInLogo.webp"),
      imageAlt: "Leadership",
      footerLink: []
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle: "",
  displayMediumBlogs: "false", 
  blogs: [],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: "",
  talks: [],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "",
  podcast: [],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle: "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+966510026302",
  email_address: "yousif.tariq@hotmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};

import React from "react";
import { motion } from "framer-motion";

// --- ASSETS ---
import donwloads from "../assets/items/download.png";
import aboutIcon from "../assets/menu_logo/about.png";
import linksIcon from "../assets/menu_logo/links.png";
import repoIcon from "../assets/menu_logo/repo.png";
import faqIcon from "../assets/menu_logo/faq.png";
import emailIcon from "../assets/menu_logo/email.png";
import helpsIcon from "../assets/menu_logo/helps.png";

const handleDownloadCV = () => {
  const link = document.createElement("a");
  link.href = "/Arrafi Aji CV's updated.pdf";
  link.download = "Arrafi Aji CV's updated.pdf";
  link.click();
};

const WelcomeCard = ({ theme, onNavigate }) => {
  const menuItems = [
    { id: "about", label: "About", icon: aboutIcon },
    { id: "links", label: "Links", icon: linksIcon },
    { id: "repo", label: "Repo", icon: repoIcon },
    { id: "faq", label: "FAQ", icon: faqIcon },
    { id: "email", label: "Email", icon: emailIcon },
    { id: "helps", label: "Helps", icon: helpsIcon },
  ];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
      className="relative w-[90vw] md:w-full md:max-w-3xl h-auto rounded-[15px] shadow-2xl flex flex-col justify-center items-center overflow-hidden px-6 py-8 md:px-12 md:py-24"
      style={{
        backgroundColor: theme.card_color,
        border: `2px solid ${theme.border_line_card}`,
        boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Btn Resume */}
      <div
        className="
          relative mb-6 
          md:absolute md:top-10 md:left-10 md:mb-0 
          flex items-center gap-3 cursor-pointer group transition-all hover:-translate-y-1 hover:opacity-70 duration-300 ease
        "
        onClick={handleDownloadCV}
      >
        <div className="w-10 h-10 border-2 border-dashed rounded-xl flex items-center justify-center">
          <img
            src={donwloads}
            alt="dl"
            className="w-5 h-5"
            style={{
              borderColor: theme.text,
              color: theme.text,
              filter: theme.iconFilter,
              transition: "all 0.3s ease",
            }}
          />
        </div>
        <span className="font-semibold text-lg" style={{ color: theme.text }}>
          Resume
        </span>
      </div>

      <div className="text-center mt-2 mb-8 md:mt-18 md:mb-14">
        <h1
          className="text-4xl md:text-6xl font-bold tracking-tight mb-2"
          style={{ color: theme.text, transition: "all 0.2s ease" }}
        >
          hello! <span style={{ color: theme.accent }}>i'm jinji</span>
        </h1>
        <p
          className="text-sm md:text-[15.5px] font-light opacity-60 tracking-wide px-2"
          style={{ color: theme.text }}
        >
          Machine Learning Engineer and Cloud Engineer
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full place-items-center md:flex md:justify-center md:gap-5 md:w-auto">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => onNavigate && onNavigate(item.id)}
          >
            <div className="w-[60px] h-[60px] md:w-[90px] md:h-[90px] flex justify-center items-center">
              <img
                src={item.icon}
                alt={item.label}
                className="max-w-[160%] max-h-[160%] object-contain block transition-transform duration-300 ease-out group-hover:-translate-y-2.5 group-hover:scale-[1.15] group-hover:opacity-70"
                style={{ filter: theme.iconFilter }}
              />
            </div>

            {/* Label Text */}
            <span
              className="text-[0.75rem] md:text-[0.85rem] font-medium transition-opacity group-hover:opacity-70"
              style={{ color: theme.text }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WelcomeCard;

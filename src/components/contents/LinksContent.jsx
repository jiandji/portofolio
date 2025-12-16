import React from "react";
// 1. IMPORT ASSETS
import imgLinkedin from "../../assets/links_logo/linkedin.png";
import imgGithub from "../../assets/links_logo/github.png";
import imgIg from "../../assets/links_logo/instagram.png";
import imgTw from "../../assets/links_logo/twitter.png";
import imgYt from "../../assets/links_logo/youtube.png";
import imgSteam from "../../assets/links_logo/steam.png";

// 2. MAPPING OBJECT ICONS
const APP_ICONS = {
  linkedin: imgLinkedin,
  github: imgGithub,
  instagram: imgIg,
  twitter: imgTw,
  youtube: imgYt,
  steam: imgSteam,
};

const LinksContent = ({ theme }) => {
  // 3. DATA LINKS
  const links = [
    {
      id: 1,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/arrafi-aji-pamungkas/",
      icon: APP_ICONS.linkedin,
      bg: "#E1F0F7",
    },
    {
      id: 2,
      name: "GitHub",
      url: "https://github.com/jiandji",
      icon: APP_ICONS.github,
      bg: "#E6E6E6",
    },
    {
      id: 3,
      name: "Instagram",
      url: "https://www.instagram.com/arafiadjie/",
      icon: APP_ICONS.instagram,
      bg: "#FCE4EC",
    },
    {
      id: 4,
      name: "Twitter",
      icon: APP_ICONS.twitter,
      bg: "#FFF9C4",
    },
    {
      id: 5,
      name: "Youtube",
      url: "https://www.youtube.com/@jiandji",
      icon: APP_ICONS.youtube,
      bg: "#FFEBEE",
    },
    {
      id: 6,
      name: "Steam",
      url: "https://s.team/p/fjjc-jmvj/FDRJPBCW",
      icon: APP_ICONS.steam,
      bg: "#E1F5FE",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-[15px] w-full min-w-[300px]">
      <div
        className="mt-[10px] text-[0.7rem] font-extrabold tracking-[1px] opacity-60 uppercase font-['Manrope']"
        style={{ color: theme.textSecondary }}
      >
        [APPS INSTALLED]
      </div>

      <div className="grid grid-cols-3 gap-[20px] w-full p-[10px] box-border max-[360px]:gap-[10px]">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-[8px] no-underline transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-110"
            style={{ color: theme.text }}
          >
            <div
              className="w-[60px] h-[60px] rounded-[18px] flex items-center justify-center overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] max-[360px]:w-[50px] max-[360px]:h-[50px]"
              style={{
                backgroundColor: link.bg,
                border: `2px solid ${theme.border_line_card || "transparent"}`,
              }}
            >
              <img
                src={link.icon}
                alt={link.name}
                className="w-[70%] h-[70%] object-contain"
              />
            </div>

            {/* .app-label */}
            <span className="font-['Manrope'] text-[0.75rem] font-bold text-center whitespace-nowrap">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinksContent;

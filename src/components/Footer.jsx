import React from "react";

// --- ASSETS ---
import linkedin from "../assets/items/linkedin.png";
import instagram from "../assets/items/instagram.png";
import youtube from "../assets/items/youtube.png";

// passing value into props, untuk digunakan sebagai switch dark mode, nanti return menjadi theme
const Footer = ({ theme }) => {
  return (
    // Container Utama: Menggantikan .footer-icons (asumsi ingin di tengah)
    <div className="flex flex-col items-center justify-center w-full py-2.5">
      {/* Container untuk Icons: Mengatur jarak antar icon (gap) */}
      <div className="flex justify-center gap-9">
        {/* Instagram */}
        <a href="https://www.instagram.com/arafiadjie/">
          <img
            src={instagram}
            alt="Instagram"
            // Class menggantikan .icons-footer & .icons-footer:hover
            className="w-5 h-5  opacity-45 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.2] hover:rotate-12"
            style={{ filter: theme.iconFilter }}
          />
        </a>

        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/arrafi-aji-pamungkas/">
          <img
            src={linkedin}
            alt="LinkedIn"
            className="w-5 h-5 opacity-45 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.2] hover:rotate-12"
            style={{ filter: theme.iconFilter }}
          />
        </a>

        {/* Youtube */}
        <a href="https://www.youtube.com/@jiandji">
          <img
            src={youtube}
            alt="Youtube"
            className="w-5 h-5 opacity-45 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.2] hover:rotate-12"
            style={{ filter: theme.iconFilter }}
          />
        </a>
      </div>

      {/* Text Copyright */}
      <p
        // Class menggantikan .footerMark
        className="mt-2 text-xs opacity-70 transition-colors duration-500 ease-out"
        style={{
          color: theme.textSecondary,
        }}
      >
        © 2025 Arrafi Pamungkas
      </p>
    </div>
  );
};

export default Footer;

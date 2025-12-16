// --- ESSENTIALS ---
import React, { useState, useEffect } from "react";
import Wave from "react-wavify";
//import "./styles/App.css";

// --- FSX ---
import ReactHowler from "react-howler";
import useSound from "use-sound";

// --- SFX ASSETS ---
import sfxMoon from "./assets/sfx/triring.MP3";
import sfxSun from "./assets/sfx/treng.MP3";
import sfxOpen from "./assets/sfx/trek_open.MP3";
import sfxClose from "./assets/sfx/trek_close.MP3";

// --- COMPONENTS ---
import Footer from "./components/Footer.jsx";
import WelcomeCard from "./components/WelcomeCard.jsx";
import BaseCard from "./components/BaseCard.jsx";
import AboutContent from "./components/contents/AboutContent.jsx";
import EmailContent from "./components/contents/EmailContent.jsx";
import LinksContent from "./components/contents/LinksContent.jsx";
import RepoContent from "./components/contents/RepoContent.jsx";
import FaqContent from "./components/contents/FaqContent.jsx";
import HelpsContent from "./components/contents/HelpsContent.jsx";

// --- CONFIG & ASSETS ---
import { THEME_CONFIG } from "./styles/Theme";
import bear from "./assets/character/bear.png";
import light_mode from "./assets/items/sun.png";
import dark_mode from "./assets/items/moon.png";
import bgMusic from "./assets/music/sunny_weather.mp3";

const SwitchDarkMode = ({ theme, isDarkMode, toggleTheme }) => {
  const baseIconClass =
    "absolute inset-0 m-auto w-6 h-6 transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.2] group-hover:-rotate-12";

  return (
    <div
      className="group relative w-10 h-10 cursor-pointer overflow-hidden rounded-full"
      onClick={toggleTheme}
    >
      {/* Sun Icons*/}
      <img
        src={light_mode}
        alt="Sun"
        className={`${baseIconClass} ${
          isDarkMode
            ? "-translate-y-[200%] opacity-0"
            : "translate-y-0 opacity-100"
        }`}
        style={{ filter: theme.iconFilter }}
      />

      {/* Moon icons */}
      <img
        src={dark_mode}
        alt="Moon"
        className={`${baseIconClass} ${
          isDarkMode
            ? "translate-y-0 opacity-100"
            : "translate-y-[200%] opacity-0"
        }`}
        style={{ filter: theme.iconFilter }}
      />
    </div>
  );
};

// handle music play
const MusicPlay = ({ theme, isPlaying, toggleMusic }) => {
  return (
    <div
      onClick={toggleMusic}
      className="w-10 h-10 flex justify-center items-center rounded-full border-2 cursor-pointer text-[1.2rem] flex-shrink-0 transition-transform duration-200 ease-out hover:scale-110"
      style={{
        borderColor: theme.text,
        color: theme.text,
        backgroundColor: isPlaying ? theme.highlight : "transparent",
        transitionProperty: "transform, background-color",
        transitionDuration: "0.2s",
      }}
    >
      {isPlaying ? "🎵" : "🔇"}
    </div>
  );
};

function App() {
  // card menu usestate
  const [showCard, setShowCard] = useState(true);
  const [openMenus, setOpenMenus] = useState([]);

  // dark mode var switch usestate
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = isDarkMode ? THEME_CONFIG.dark : THEME_CONFIG.light;

  // music play var usestate
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicKey, setMusicKey] = useState(0);

  // sfx switch usestate
  // dark-mode switch
  const [playSun] = useSound(sfxSun, { volume: 0.5 });
  const [playMoon] = useSound(sfxMoon, { volume: 0.5 });

  // open-close card
  const [playOpen] = useSound(sfxOpen, { volume: 0.5 });
  const [playClose] = useSound(sfxClose, { volume: 0.5 });

  // card vector positions
  const CARD_POSITIONS = {
    about: { x: 200, y: 100 },
    links: { x: 900, y: 90 },
    repo: { x: 100, y: 50 },
    faq: { x: 900, y: 100 },
    email: { x: 950, y: 150 },
    helps: { x: 1000, y: 80 },
  };

  // handle show card
  const handleNavigation = (menuName) => {
    playOpen();
    setShowCard(true);
    if (!openMenus.includes(menuName)) {
      // Kalau belum, tambahkan ke list (pertahankan menu yg lama)
      setOpenMenus((prev) => [...prev, menuName]);
    }
  };

  // handle switch dark-mode
  const handleToggle = () => {
    if (!isDarkMode) {
      playMoon();
    } else {
      playSun();
    }

    setIsDarkMode(!isDarkMode);
  };

  // handle music toggle
  const handleMusicToggle = () => {
    if (isPlaying) {
      setMusicKey((prev) => prev + 1);
      setIsPlaying(false);
    } else {
      setMusicKey((prev) => prev + 1);
      setIsPlaying(true);
    }
  };

  // close card state
  const closeSubCard = (menuName) => {
    playClose();
    setOpenMenus((prev) => prev.filter((id) => id !== menuName));
  };

  // open card state
  useEffect(() => {
    if (openMenus.length === 0 && !showCard) {
      setShowCard(true);
    }
  }, [openMenus]);

  const renderContent = () => {
    return (
      <>
        {openMenus.includes("about") && (
          <BaseCard
            key="about"
            title="🍃 RESIDENT INFO"
            onClose={() => closeSubCard("about")}
            theme={currentTheme}
            initialPosition={CARD_POSITIONS.about}
          >
            <AboutContent theme={currentTheme} />
          </BaseCard>
        )}

        {openMenus.includes("links") && (
          <BaseCard
            key="links"
            title="✈️ CONNECTION"
            onClose={() => closeSubCard("links")}
            theme={currentTheme}
            initialPosition={CARD_POSITIONS.links}
          >
            <LinksContent theme={currentTheme} />
          </BaseCard>
        )}

        {openMenus.includes("repo") && (
          <BaseCard
            key="repo"
            title="🛠️ REPO"
            onClose={() => closeSubCard("repo")}
            theme={currentTheme}
            initialPosition={CARD_POSITIONS.repo}
          >
            <RepoContent theme={currentTheme} />
          </BaseCard>
        )}

        {openMenus.includes("faq") && (
          <BaseCard
            key="faq"
            title="❓ FAQ"
            onClose={() => closeSubCard("faq")}
            theme={currentTheme}
            initialPosition={CARD_POSITIONS.faq}
          >
            <FaqContent theme={currentTheme} />
          </BaseCard>
        )}

        {openMenus.includes("email") && (
          <BaseCard
            key="email"
            title="📮 POSTAL SERVICE"
            onClose={() => closeSubCard("email")}
            theme={currentTheme}
            initialPosition={CARD_POSITIONS.email}
          >
            <EmailContent theme={currentTheme} />
          </BaseCard>
        )}

        {openMenus.includes("helps") && (
          <BaseCard
            key="helps"
            title="🛟 HELPS"
            onClose={() => closeSubCard("helps")}
            theme={currentTheme}
            initialPosition={CARD_POSITIONS.helps}
          >
            <HelpsContent theme={currentTheme} />
          </BaseCard>
        )}
      </>
    );
  };

  return (
    // APP
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden -z-50"
      style={{
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
        transition: "all 0.5s ease",
      }}
    >
      <div className="fixed top-[25px] left-[25px] z-[999] flex items-center gap-[15px]">
        {/* Dark Mode Switch */}
        <SwitchDarkMode
          theme={currentTheme}
          isDarkMode={isDarkMode}
          toggleTheme={handleToggle}
        />

        {/* Music Button */}
        <MusicPlay
          theme={currentTheme}
          isPlaying={isPlaying}
          toggleMusic={handleMusicToggle}
        />
      </div>

      {/* React Howler for play Music */}
      <ReactHowler
        key={musicKey}
        src={bgMusic}
        playing={isPlaying}
        loop={true}
        volume={0.5}
        html5={true}
      />

      {/* Menu Content Render Call function */}
      <div className="absolute inset-0 z-9999 pointer-events-none overflow-hidden">
        {renderContent()}
      </div>

      {/* Wave Container */}
      <div className="absolute bottom-0 left-0 w-full">
        {/* Highlight Wave */}
        <div className="absolute bottom-0 left-0 w-full h-[39vh] opacity-70 blur-xl">
          <Wave
            fill={currentTheme.highlight}
            paused={false}
            style={{ display: "flex", height: "100%" }}
            options={{
              height: 80,
              amplitude: 10,
              speed: 0.2,
              points: 4,
            }}
          />
        </div>

        {/* Main Wave */}
        <div className="absolute bottom-0 left-0 w-full h-[32vh] z-10">
          <Wave
            fill="url(#gradient)"
            paused={false}
            style={{ display: "flex", height: "100%" }}
            options={{
              height: 10,
              amplitude: 30,
              speed: 0.2,
              points: 1,
            }}
          >
            <defs>
              <linearGradient id="gradient" gradientTransform="rotate(90)">
                <stop
                  offset="0%"
                  stopColor={currentTheme.waveTop}
                  style={{ transition: "stop-color 0.5s ease" }}
                />
                <stop
                  offset="100%"
                  stopColor={currentTheme.waveBot}
                  style={{ transition: "stop-color 0.5s ease" }}
                />
              </linearGradient>
            </defs>
          </Wave>
        </div>

        <div className="absolute bottom-0 w-full z-20 pointer-events-auto">
          <Footer theme={currentTheme} />
        </div>
        {/* Bear */}
        <div className="absolute bottom-0 right-6 z-20 pointer-events-auto cursor-pointer transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-95">
          <div className="w-[100px] h-auto" onClick={() => setShowCard(true)}>
            <img
              src={bear}
              alt="Mascot Menu"
              className={`
        w-full h-auto block transition-[filter,drop-shadow] duration-500 ease-in-out
        ${
          isDarkMode
            ? "drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] sepia hue-rotate-190deg saturate-[1.5] brightness-[0.8] contrast-[1.2]"
            : "drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)]"
        }
      `}
            />
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      {showCard && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <WelcomeCard
            onClose={() => setShowCard(false)}
            theme={currentTheme}
            onNavigate={handleNavigation}
          />
        </div>
      )}
    </div>
  );
}

export default App;

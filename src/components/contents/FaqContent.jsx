import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown, IoHelpBuoyOutline } from "react-icons/io5";

const FAQContent = ({ theme }) => {
  // --- DATA PERTANYAAN ---
  const faqData = [
    {
      id: 1,
      question: "What tech stack do you use?",
      answer:
        "My main daily drivers are React.js for frontend, Python (FastAPI/Flask) for backend, and PostgreSQL for database. I also love playing with Data and Cloud Services!",
    },
    {
      id: 2,
      question: "Are you open to freelance?",
      answer:
        "Yes! I am currently open for freelance projects, especially related to Machine Learning integration or Web Development. Hit me up via email!",
    },
    {
      id: 3,
      question: "What is your favorite coffee?",
      answer:
        "Iced Americano, no sugar. I like the bitter coffee. Just like how Warriors makes it at The Tavern ☕.",
    },
    {
      id: 4,
      question: "Where are you based?",
      answer:
        "I am a digital nomad currently based in the 'Drown Isle' (Indonesia). Ready to work remotely worldwide.",
    },
    {
      id: 5,
      question: "Do you play some games?",
      answer:
        "I already sold my soul into Riot Games 💀. So, i just play League and other variaty games for fun.",
    },
    {
      id: 6,
      question: "Chickins?",
      answer: "Yess of course!! MCD please? 🍗🍟",
    },
    {
      id: 7,
      question: "Read some books?",
      answer:
        "Yes obviously, but not that much. I just like read some world-wide tech news, books of investment, and manhwas",
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-[400px] max-w-[90vw] h-auto flex flex-col gap-[15px] font-['Manrope'] p-[20px] box-border max-[450px]:w-full">
      <div
        className="text-[0.7rem] font-extrabold tracking-[1px] opacity-60 uppercase mb-[5px] text-center"
        style={{ color: theme.textSecondary }}
      >
        [RESCUE SERVICE FAQ]
      </div>

      {/* .faq-list */}
      <div className="flex flex-col gap-[10px]">
        {faqData.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="border-2 rounded-xl cursor-pointer transition-all duration-200 ease-out hover:bg-black/5 hover:translate-x-[2px]"
              onClick={() => toggleFAQ(item.id)}
              style={{
                backgroundColor: isOpen
                  ? theme.highlight + "20"
                  : "rgba(0,0,0,0.02)",

                borderColor: isOpen
                  ? theme.border_line_card || "#ccc"
                  : "transparent",
              }}
            >
              <div className="p-[12px_15px] flex justify-between items-center text-[0.85rem] select-none">
                <div className="flex items-center gap-[10px]">
                  <IoHelpBuoyOutline
                    className="text-[1.1rem] flex-shrink-0"
                    style={{
                      color: isOpen ? theme.accent : theme.textSecondary,
                    }}
                  />
                  <span
                    style={{
                      color: theme.text,
                      fontWeight: isOpen ? 800 : 600,
                    }}
                  >
                    {item.question}
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ color: theme.textSecondary }}
                >
                  <IoChevronDown />
                </motion.div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="p-[15px] m-[0_10px_10px_10px] text-[0.8rem] leading-[1.5] font-['Manrope'] bg-white/30 rounded-b-lg"
                      style={{
                        color: theme.textSecondary,
                        borderTop: `1px dashed ${theme.border_line_card}`,
                      }}
                    >
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div
        className="text-center text-[0.7rem] italic opacity-50 mt-[10px]"
        style={{ color: theme.textSecondary }}
      >
        "Operator is standing by..."
      </div>
    </div>
  );
};

export default FAQContent;

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
      question: "What do you specialize in?",
      answer:
        "I specialize in AI and Machine Learning, particularly NLP, data pipelines, model deployment, and scalable automation systems.",
    },
    {
      id: 3,
      question: "What kind of projects have you worked on?",
      answer:
        "I have worked on news scraping automation, NLP systems, machine learning pipelines, monitoring dashboards, and infrastructure for deploying data-driven applications.",
    },
    {
      id: 4,
      question: "Where are you based?",
      answer:
        "I am a digital nomad currently based in the 'Drown Isle' (Indonesia). Ready to work remotely worldwide.",
    },
    {
      id: 5,
      question: "Can you deploy machine learning systems?",
      answer:
        "Yes. I can handle the process from data preparation and model development to containerization, workflow orchestration, CI/CD, and server deployment.",
    },
    {
      id: 6,
      question: "Chickins?",
      answer: "Yess of course!! MCD please? 🍗🍟",
    },
    {
      id: 7,
      question: "Are you open to new opportunities?",
      answer:
        "Yes. I am open to opportunities related to AI Engineering, Machine Learning, Data Science, MLOps, and Data Engineering. (Also Infrastructure Operations / DevOps)",
    },
    {
      id: 8,
      question: "Have you handled large-scale data pipelines?",
      answer:
        "Yes. I built an automated pipeline that collects, stores, and processes news articles from more than 1,000 websites using Python, Newspaper3k, and Apache Airflow.",
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
        style={{ color: theme.text_secondary_color }}
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
                  ? theme.highlight_color
                  : "rgba(0,0,0,0.02)",

                borderColor: isOpen
                  ? theme.borderline_card_color || "#ccc"
                  : "transparent",
              }}
            >
              <div className="p-[12px_15px] flex justify-between items-center text-[0.85rem] select-none">
                <div className="flex items-center gap-[10px]">
                  <IoHelpBuoyOutline
                    className="text-[1.1rem] flex-shrink-0"
                    style={{
                      color: isOpen
                        ? theme.accent_color
                        : theme.text_secondary_color,
                    }}
                  />
                  <span
                    style={{
                      color: theme.text_color,
                      fontWeight: isOpen ? 800 : 600,
                    }}
                  >
                    {item.question}
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ color: theme.text_secondary_color }}
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
                        color: theme.text_secondary_color,
                        borderTop: `1px dashed ${theme.borderline_card_color}`,
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
        style={{ color: theme.text_secondary_color }}
      >
        "Operator is standing by..."
      </div>
    </div>
  );
};

export default FAQContent;

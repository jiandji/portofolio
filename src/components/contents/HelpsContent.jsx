import React, { useState, useRef, useEffect } from "react";
import botAvatar from "../../assets/character/bear.png";
import userAvatar from "../../assets/character/wolflink.webp";

const HelpsContent = ({ theme }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // --- INITIAL CHAT HISTORY ---
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Halo! I am Arrafi's AI Assistant. Ask me anything about Arrafi's projects, skills, or even his favorite food or coffee! ☕",
    },
  ]);

  // Fungsi Scroll ke Bawah Otomatis
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- SEND MESSAGE LOGIC ---
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // ip devices
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply || "Maaf, ada gangguan sinyal... 📡",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Server error. Is the Python backend running?",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-[60vh] w-[400px] max-w-[90vw] rounded-[20px] overflow-hidden font-sans max-[600px]:h-[75vh]"
      style={{
        backgroundColor: theme.card_color,
        color: theme.text,
      }}
    >
      <div
        className="px-5 py-[15px] text-[0.8rem] font-extrabold tracking-[1px] opacity-80 flex items-center gap-2"
        style={{ borderBottom: `1px dashed ${theme.border_line_card}` }}
      >
        <span style={{ color: theme.accent }}>●</span> LIVE CHAT WITH AI
      </div>

      {/* AREA CHAT (SCROLLABLE) */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-[15px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-md">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 items-end max-w-[85%] max-[600px]:max-w-full ${
                isUser ? "self-end justify-end" : "self-start"
              }`}
            >
              {!isUser && (
                <img
                  src={botAvatar}
                  alt="Bot"
                  className="w-[35px] h-[35px] rounded-full object-cover border-2 bg-white flex-shrink-0 max-[600px]:w-[30px] max-[600px]:h-[30px]"
                  style={{ borderColor: theme.border_line_card }}
                />
              )}

              {/* BUBBLE CHAT */}
              <div
                className="p-[12px_16px] text-[0.9rem] leading-[1.5] shadow-sm relative break-words whitespace-pre-wrap"
                style={{
                  backgroundColor: isUser ? theme.accent : theme.highlight,
                  color: isUser ? theme.btnText : theme.text,
                  border: `1px solid ${
                    isUser ? theme.accent : theme.border_line_card
                  }`,
                  borderRadius: isUser
                    ? "15px 15px 0 15px"
                    : "15px 15px 15px 0",
                }}
              >
                {msg.text}
              </div>

              {isUser && (
                <img
                  src={userAvatar}
                  alt="User"
                  className="w-[35px] h-[35px] rounded-full object-cover border-2 bg-white flex-shrink-0 max-[600px]:w-[30px] max-[600px]:h-[30px]"
                  style={{ borderColor: theme.border_line_card }}
                />
              )}
            </div>
          );
        })}

        {/* LOADING INDICATOR */}
        {isLoading && (
          <div className="flex gap-2.5 items-end max-w-[85%] self-start">
            <img
              src={botAvatar}
              alt="Bot"
              className="w-[35px] h-[35px] rounded-full object-cover border-2 bg-white flex-shrink-0 max-[600px]:w-[30px] max-[600px]:h-[30px]"
              style={{ borderColor: theme.border_line_card }}
            />
            <div
              className="p-[8px_16px] font-bold text-[#888] rounded-[15px_15px_15px_0] shadow-sm"
              style={{ backgroundColor: theme.highlight }}
            >
              <span className="inline-block mx-[1px] animate-[bounce_1.4s_infinite_-0.32s]">
                .
              </span>
              <span className="inline-block mx-[1px] animate-[bounce_1.4s_infinite_-0.16s]">
                .
              </span>
              <span className="inline-block mx-[1px] animate-[bounce_1.4s_infinite]">
                .
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <form
        className="p-[15px] flex gap-2.5 bg-black/5"
        onSubmit={handleSend}
        style={{ borderTop: `1px dashed ${theme.border_line_card}` }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1 p-[12px_15px] rounded-[25px] border border-black/10 outline-none text-[0.9rem] transition-all duration-200 focus:ring-2 focus:ring-gray-400/20"
          style={{
            color: theme.text,
            backgroundColor:
              theme.bg === "#0B1120" ? "rgba(255,255,255,0.05)" : "#f9f9f9",
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 rounded-[25px] border-none font-extrabold text-[0.8rem] cursor-pointer transition-transform duration-100 hover:enabled:scale-105 hover:enabled:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: theme.accent,
            color: theme.btnText,
          }}
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default HelpsContent;

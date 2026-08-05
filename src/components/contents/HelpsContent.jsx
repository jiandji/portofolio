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

    // Snapshot history SEBELUM pesan baru ditambahkan (dikirim ke backend buat memori percakapan)
    const history = messages.map((m) => ({ sender: m.sender, text: m.text }));

    const userMsg = { id: Date.now(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput, history }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Bad response: ${response.status}`);
      }

      // --- STREAMING: baca jawaban token demi token ---
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let botId = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        if (botId === null) {
          // chunk pertama tiba: matikan indikator loading & buat bubble bot
          botId = Date.now() + 1;
          setIsLoading(false);
          setMessages((prev) => [...prev, { id: botId, sender: "bot", text: acc }]);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === botId ? { ...m, text: acc } : m))
          );
        }
      }

      // Tidak ada teks sama sekali yang datang
      if (botId === null) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: "bot", text: "Maaf, ada gangguan sinyal... 📡" },
        ]);
      }
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
        color: theme.text_color,
      }}
    >
      <div
        className="px-5 py-[15px] text-[0.8rem] font-extrabold tracking-[1px] opacity-80 flex items-center gap-2"
        style={{ borderBottom: `1px dashed ${theme.borderline_card_color}` }}
      >
        <span style={{ color: theme.accent_color }}>●</span> LIVE CHAT WITH AI
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
                  style={{ borderColor: theme.borderline_card_color }}
                />
              )}

              {/* BUBBLE CHAT */}
              <div
                className="p-[12px_16px] text-[0.9rem] leading-[1.5] shadow-sm relative break-words whitespace-pre-wrap"
                style={{
                  backgroundColor: isUser ? theme.accent_color : theme.highlight_color,
                  color: isUser ? theme.btn_text_color : theme.text_color,
                  border: `1px solid ${
                    isUser ? theme.accent_color : theme.borderline_card_color
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
                  style={{ borderColor: theme.borderline_card_color }}
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
              style={{ borderColor: theme.borderline_card_color }}
            />
            <div
              className="p-[8px_16px] font-bold text-[#888] rounded-[15px_15px_15px_0] shadow-sm"
              style={{ backgroundColor: theme.highlight_color }}
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
        style={{ borderTop: `1px dashed ${theme.borderline_card_color}` }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1 p-[12px_15px] rounded-[25px] border border-black/10 outline-none text-[0.9rem] transition-all duration-200 focus:ring-2 focus:ring-gray-400/20"
          style={{
            color: theme.text_color,
            backgroundColor:
              theme.bg_color === "#0B1120" ? "rgba(255,255,255,0.05)" : "#f9f9f9",
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 rounded-[25px] border-none font-extrabold text-[0.8rem] cursor-pointer transition-transform duration-100 hover:enabled:scale-105 hover:enabled:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: theme.accent_color,
            color: theme.btn_text_color,
          }}
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default HelpsContent;

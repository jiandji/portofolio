import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoPaperPlane, IoPerson, IoMail, IoCreate } from "react-icons/io5";

const EmailContent = ({ theme }) => {
  const form = useRef();
  const [status, setStatus] = useState("idle");

  const sendToMake = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = {
      name: form.current.user_name.value,
      email: form.current.user_email.value,
      message: form.current.message.value,
      date: new Date().toLocaleString(),
    };

    const WEBHOOK_URL =
      "https://hook.us2.make.com/b5pxp9ueomx2gvi29n36y56ezer7rwt5";

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Sent to Make!");
        setStatus("success");
        e.target.reset();
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const inputBgColor =
    theme.bg === "#fff" || theme.bg === "#FFFBF0"
      ? "#F5F5F5"
      : "rgba(255,255,255,0.1)";

  return (
    <div className="w-[400px] max-w-[90vw] flex flex-col gap-4 p-5 font-['Manrope']">
      <div
        className="text-[0.7rem] font-extrabold tracking-widest opacity-60 uppercase text-center mb-1"
        style={{ color: theme.textSecondary }}
      >
        [SEND A CARD]
      </div>

      <form ref={form} onSubmit={sendToMake} className="flex flex-col gap-3">
        {/* INPUT NAME */}
        <div className="relative flex items-center">
          <IoPerson
            className="absolute left-3 text-[1.1rem] z-10" // .input-icon
            style={{ color: theme.textSecondary }}
          />
          <input
            type="text"
            name="user_name"
            placeholder="Villager Name"
            required
            className="w-full p-3 pl-10 border-none rounded-xl text-[0.85rem] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-black/10 placeholder:opacity-50"
            style={{
              backgroundColor: inputBgColor,
              color: theme.text,
            }}
          />
        </div>

        {/* INPUT EMAIL */}
        <div className="relative flex items-center">
          <IoMail
            className="absolute left-3 text-[1.1rem] z-10"
            style={{ color: theme.textSecondary }}
          />
          <input
            type="email"
            name="user_email"
            placeholder="Contact Address"
            required
            className="w-full p-3 pl-10 border-none rounded-xl text-[0.85rem] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-black/10 placeholder:opacity-50"
            style={{
              backgroundColor: inputBgColor,
              color: theme.text,
            }}
          />
        </div>

        {/* TEXT AREA PESAN */}

        <div className="relative flex items-start">
          <IoCreate
            className="absolute left-3 top-3 text-[1.1rem] z-10" // .input-icon.top-align
            style={{ color: theme.textSecondary }}
          />
          <textarea
            name="message"
            placeholder="Write your letter here..."
            required
            className="w-full p-3 pl-10 border-none rounded-xl text-[0.85rem] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-black/10 placeholder:opacity-50 min-h-[100px] resize-none"
            style={{
              backgroundColor: inputBgColor,
              color: theme.text,
            }}
          />
        </div>

        {/* TOMBOL KIRIM */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-2.5 p-3 border-none rounded-xl text-sm font-extrabold cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={status === "sending" || status === "success"}
          style={{
            backgroundColor: status === "success" ? "#78DD62" : theme.accent,
            color: "#fff",
          }}
        >
          {status === "idle" && (
            <>
              <IoPaperPlane /> Send Letter
            </>
          )}
          {status === "sending" && "Flying..."}
          {status === "success" && "Delivered!"}
          {status === "error" && "Failed"}
        </motion.button>

        {status === "success" && (
          <div
            className="text-[0.7rem] text-center italic opacity-80"
            style={{ color: theme.textSecondary }}
          >
            *Orville has delivered your mail!
          </div>
        )}
      </form>
    </div>
  );
};

export default EmailContent;

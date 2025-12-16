import React, { useRef } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";

const BaseCard = ({
  title,
  onClose,
  theme,
  children,
  className,
  style,
  initialPosition,
}) => {
  const nodeRef = useRef(null);
  const startX = initialPosition?.x || 0;
  const startY = initialPosition?.y || 0;

  // mobile / desktop var state
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    return (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`fixed bottom-0 left-0 right-0 z-[99999] w-full h-auto max-h-[90dvh] rounded-t-[25px] flex flex-col pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.2)] ${
          className || ""
        }`}
        style={{
          backgroundColor: theme.card_color,
          color: theme.text,
          ...style,
        }}
      >
        <div
          className="card-header flex-shrink-0 flex justify-between items-center w-full px-6 py-5 border-b-2 border-dashed select-none box-border"
          style={{
            borderColor: theme.border_line_card,
          }}
        >
          <span
            className="font-extrabold tracking-widest uppercase text-[0.9rem]"
            style={{ color: theme.text }}
          >
            {title}
          </span>
          <div
            className="cursor-pointer text-[1.4rem] font-bold hover:opacity-60 transition-opacity p-1"
            onClick={onClose}
            style={{ color: theme.textSecondary }}
          >
            ✕
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-0 flex flex-col w-full relative items-center pb-8">
          {children}
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className="absolute z-[9999] w-0 h-0 overflow-visible pointer-events-none"
      style={{
        left: startX,
        top: startY,
      }}
    >
      <Draggable
        nodeRef={nodeRef}
        handle=".card-header"
        defaultPosition={{ x: 0, y: 0 }}
      >
        <div
          ref={nodeRef}
          className={`flex flex-col rounded-[15px] border-2 shadow-2xl pointer-events-auto w-max max-w-[90vw] ${
            className || ""
          }`}
          style={{
            backgroundColor: theme.card_color,
            borderColor: theme.border_line_card,
            color: theme.text,
            transition: "background-color 0.3s, border-color 0.3s, color 0.3s",
            ...style,
          }}
        >
          {/* --- HEADER --- */}
          <div
            className="card-header flex justify-between items-center w-full px-5 py-3 border-b-2 border-dashed select-none box-border"
            style={{
              borderColor: theme.border_line_card,
            }}
          >
            <span
              className="font-extrabold tracking-widest uppercase text-[0.85rem]"
              style={{ color: theme.text }}
            >
              {title}
            </span>
            <div
              className="cursor-pointer text-[1.2rem] font-bold hover:opacity-60 transition-opacity"
              onClick={onClose}
              style={{ color: theme.textSecondary }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              ✕
            </div>
          </div>

          {/* --- BODY --- */}
          <div className="flex-1 overflow-hidden p-0 flex flex-col">
            {children}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default BaseCard;

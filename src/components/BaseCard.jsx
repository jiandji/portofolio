import React, { useRef } from "react";
import Draggable from "react-draggable";

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

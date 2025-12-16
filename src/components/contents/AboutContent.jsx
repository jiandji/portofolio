import React from "react";
import myPhoto from "../../assets/myphoto.jpeg";

const AboutContent = ({ theme }) => {
  const skills = [
    { name: "Machine Learning", level: "90%", color: "#FF9A8B" },
    { name: "Cloud & Network", level: "80%", color: "#F4D35E" },
    { name: "Python & SQL", level: "95%", color: "#95D5B2" },
    { name: "Web Development", level: "75%", color: "#7DD3FC" },
    { name: "Aws", level: "80%", color: "#F993CEFF" },
    { name: "Oracle Cloud", level: "85%", color: "#EB7699FF" },
    { name: "Problem Solving", level: "99%", color: "#A172E2FF" },
  ];

  return (
    <div className="w-full max-w-[440px] mx-auto flex flex-col gap-[15px] p-[10px] box-border">
      <div className="flex flex-col-reverse items-center text-center gap-[15px] sm:flex-row sm:text-left sm:items-center sm:justify-between">
        <div className="flex-1 flex flex-col justify-center gap-2 min-w-0 w-full sm:w-auto">
          <div
            className="font-extrabold text-[0.7rem] tracking-widest opacity-60 uppercase"
            style={{ color: theme.textSecondary }}
          >
            [DATA ISLE RESIDENT]
          </div>

          <div className="flex flex-col">
            <h2
              className="m-0 text-[1.3rem] font-extrabold leading-[1.2]"
              style={{ color: theme.text }}
            >
              Arrafi Aji Pamungkas
            </h2>

            <p
              className="m-[2px_0_0_0] text-[0.85rem] font-semibold opacity-90"
              style={{ color: theme.accent }}
            >
              ML & Cloud Engineer
            </p>
          </div>

          <div
            className="mt-[5px] p-[8px_10px] rounded-md italic text-[0.75rem] leading-[1.3] border-t-[3px] sm:border-t-0 sm:border-l-[3px]"
            style={{
              backgroundColor: theme.bg,
              color: theme.textSecondary,
              borderColor: theme.text,
            }}
          >
            "Hobby do some explore-code, analyst data, investment dan manhwas
            addict."
          </div>
        </div>

        <div className="flex-none flex flex-col items-center w-[90px]">
          <div
            className="w-[80px] h-[100px] rounded-lg border-[3px] border-solid overflow-hidden shadow-md bg-white"
            style={{
              backgroundColor: theme.bg,
              borderColor: theme.text,
            }}
          >
            <img
              src={myPhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="mt-[5px] text-center text-[0.6rem] font-bold tracking-widest opacity-50"
            style={{ color: theme.textSecondary }}
          >
            FOTO PROFIL
          </div>
        </div>
      </div>

      {/* --- DIVIDER --- */}

      <div
        className="w-full border-b-[2px] border-dashed opacity-40 my-[5px]"
        style={{ borderColor: theme.border_line_card || "#ccc" }}
      ></div>

      {/* .skills-section */}
      <div className="flex flex-col gap-[10px]">
        <div
          className="mb-[5px] font-extrabold text-[0.75rem] tracking-widest uppercase opacity-70"
          style={{ color: theme.text }}
        >
          ISLAND SKILLS & ACHIEVEMENTS
        </div>

        {/* .skills-list */}
        <div className="flex flex-col gap-[10px] pr-[35px]">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-[0.8rem]"
            >
              <div className="flex items-center gap-2 w-[45%] font-bold">
                <div
                  className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                  style={{ backgroundColor: skill.color }}
                ></div>
                <span style={{ color: theme.text }}>{skill.name}</span>
              </div>

              {/* Bar Progress (.bar-container) */}
              <div
                className="flex-1 h-[8px] rounded-[4px] relative"
                style={{ backgroundColor: theme.bg }}
              >
                {/* .bar-fill */}
                <div
                  className="h-full rounded-[4px] transition-[width] duration-200 ease-out"
                  style={{
                    width: skill.level,
                    backgroundColor: skill.color,
                  }}
                ></div>
                {/* .percent-text */}
                <span
                  className="absolute -right-[35px] -top-[2px] text-[0.7rem] font-bold w-[30px] text-left"
                  style={{ color: theme.textSecondary }}
                >
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="text-right text-[0.7rem] font-bold opacity-40 mt-[5px]"
        style={{ color: theme.textSecondary }}
      >
        [Stamp: Approved by Nook]
      </div>
    </div>
  );
};

export default AboutContent;

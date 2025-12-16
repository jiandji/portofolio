import React from "react";
// No CSS import needed anymore

// --- IMPORT PROJECTS ---
import gameLife from "../../assets/repo_projects/game_life.png";
import bengkel from "../../assets/repo_projects/bengkel.png";
import unimedia from "../../assets/repo_projects/union.png";
import olx from "../../assets/repo_projects/olx.png";
import airbnb from "../../assets/repo_projects/airbnb.png";
import aws from "../../assets/repo_projects/aws.png";
import machineLearning from "../../assets/repo_projects/ml.png";

// --- IMPORT CERTIFICATES ---
import dataScience from "../../assets/repo_certificate/ds.png";
import aiAssociate from "../../assets/repo_certificate/ai.png";
import aiVector from "../../assets/repo_certificate/search_ai.png";
import genAI from "../../assets/repo_certificate/genai.png";
import awsCertif from "../../assets/repo_certificate/revou.png";
import awsPractitioner from "../../assets/repo_certificate/aws_practitioner.png";

const RepoContent = ({ theme }) => {
  // Data Tools
  const toolsList = [
    "Git",
    "VScode",
    "JupyterNb",
    "Figma",
    "Canva",
    "Google Console",
    "AWS Services",
    "Adobe Premiere",
    "Capcut",
    "Microsoft",
  ];

  // Data Development
  const devList = [
    "Flutter/Dart",
    "Python",
    "JavaScript",
    "HTML/CSS",
    "React",
    "Golang",
    "Next.js",
  ];

  const certification = [
    {
      id: 1,
      title: "OCI AI Associate",
      image: aiAssociate,
      desc: "",
      issued: "Oracle",
    },
    {
      id: 2,
      title: "OCI Datascience Professional",
      image: dataScience,
      desc: "",
      issued: "Oracle",
    },
    {
      id: 3,
      title: "OCI Search AI Vector Professional",
      image: aiVector,
      desc: "",
      issued: "Oracle",
    },
    {
      id: 4,
      title: "OCI Generative AI Professional",
      image: genAI,
      desc: "",
      issued: "Oracle",
    },
    {
      id: 5,
      title: "MSIB AWS x RevoU: Data Engineer and GEN AI",
      image: awsCertif,
      desc: "",
      issued: "MSIB: RevoU",
    },
    {
      id: 6,
      title: "AWS Practitioner",
      image: awsPractitioner,
      desc: "",
      issued: "Amazon web service",
    },
  ];

  // Data Projects
  const projects = [
    {
      id: 1,
      title: "Game Life University",
      image: gameLife,
      desc: "A web-based game with a university daily life theme, where players must complete the game within 7 days to win. If they fail to finish within the time limit, they will lose the game.",
      tech: "React Native • JavaScript • CSS",
      link: "#",
    },
    {
      id: 2,
      title: "Workshop Website",
      image: bengkel,
      desc: "A monitoring platform that allows users to track the progress and completion of their motorcycle repairs in real time, providing updates and ensuring transparency throughout the repair process.",
      tech: "PHP-Laravel • Bootstrap",
      link: "#",
    },
    {
      id: 3,
      title: "UNION media",
      image: unimedia,
      desc: "A social media app designed to help users find new friends, where students can connect with each other to hang out, sharing and engage in various activities.",
      tech: "Android Native • Firebase",
      link: "#",
    },
    {
      id: 4,
      title: "Redesign UI/UX Ecommerce",
      image: olx,
      desc: "Develop a more refined design that balances both functionality and user-friendliness, ensuring an intuitive and seamless experience for all users. The design will focus on simplicity and clarity, allowing users to easily navigate and access key features, while maintaining robust functionality to meet their needs efficiently.",
      tech: "Figma",
      link: "#",
      btnText: "See Demo",
    },
    {
      id: 5,
      title: "AWS Hotel Dashboard",
      image: aws,
      desc: "The goal of this project is to create a hotel revenue dashboard using AWS services, offering valuable insights into the hotel's performance. The dashboard will feature interactive visualizations through AWS QuickSight, helping managers make data-driven decisions to optimize revenue and improve overall operations.",
      tech: "AWS Services • Bigquery",
      link: "#",
      btnText: "See Demo",
    },
    {
      id: 6,
      title: "Airbnb Dashboard",
      image: airbnb,
      desc: "Build an Airbnb dashboard using Tableau to provide real-time insights into listing performance, including occupancy rates, average nightly rates, and revenue.",
      tech: "Tableau",
      link: "#",
      btnText: "See Demo",
    },
    {
      id: 7,
      title: "Machine Learning Build Model & Training",
      image: machineLearning,
      desc: "Working on developing models for various NLP tasks, ranging from hate speech detection to content classification. The models that was implementing include SVM, BERT, CNN, and XGBoost. Each model is tailored to efficiently handle different aspects of text classification, with a focus on improving accuracy and performance across diverse tasks in natural language processing.",
      tech: "Python • tensor • numpy • pandas • skicit-learn",
      link: "#",
      btnText: "See Demo",
    },
  ];

  // Reusable Styles
  const groupTitleClass =
    "text-[1.3rem] font-extrabold mb-4 uppercase tracking-[0.5px] opacity-80 text-left w-full";
  const dividerClass = "border-0 border-t-[2px] border-dashed opacity-50 my-8";

  return (
    // WRAPPER SCROLL
    <div
      className="h-[60vh] w-[1000px] max-w-[90vw] overflow-y-auto px-[30px] py-[25px] box-border text-left max-[650px]:h-full max-[650px]:p-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-current [&::-webkit-scrollbar-thumb]:opacity-30 [&::-webkit-scrollbar-thumb]:rounded-full"
      style={{ color: theme.text }}
    >
      <div
        className="p-4 mb-8 rounded text-left"
        style={{
          borderLeft: `5px solid ${theme.accent}`,
          backgroundColor: theme.highlight,
          color: theme.text,
        }}
      >
        <p>
          <strong>Accepting work offers!</strong>
          <br />I focus on building robust machine learning models, as well as
          designing and developing web and mobile applications. You can contact
          me via the details below. ^^
        </p>
      </div>

      <div className="flex flex-wrap gap-10 mb-5 justify-start max-[650px]:flex-col max-[650px]:gap-5">
        <div className="flex-1 min-w-[200px] flex flex-col items-start">
          <h3
            className={groupTitleClass}
            style={{ color: theme.textSecondary }}
          >
            TOOLS
          </h3>
          <div className="flex flex-wrap gap-2.5 justify-start">
            {toolsList.map((item, idx) => (
              <span
                key={idx}
                className="inline-block bg-transparent border rounded-md px-3.5 py-2 text-sm font-semibold cursor-pointer select-none transition-all duration-100 ease-in-out hover:-translate-y-0.5 hover:opacity-80 active:translate-y-1 active:shadow-none"
                style={{
                  borderColor: theme.border_line_card,
                  color: theme.buttonTextRepo,

                  boxShadow: `2px 4px 0px ${theme.border_line_card}`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-[200px] flex flex-col items-start">
          <h3
            className={groupTitleClass}
            style={{ color: theme.textSecondary }}
          >
            DEVELOPMENT
          </h3>
          <div className="flex flex-wrap gap-2.5 justify-start">
            {devList.map((item, idx) => (
              <span
                key={idx}
                className="inline-block bg-transparent border rounded-md px-3.5 py-2 text-sm font-semibold cursor-pointer select-none transition-all duration-100 ease-in-out hover:-translate-y-0.5 hover:opacity-80 active:translate-y-1 active:shadow-none"
                style={{
                  borderColor: theme.border_line_card,
                  color: theme.buttonTextRepo,
                  boxShadow: `2px 4px 0px ${theme.border_line_card}`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <hr
        className={dividerClass}
        style={{
          borderColor: theme.border_line_card,
        }}
      />

      <h3 className={groupTitleClass} style={{ color: theme.textSecondary }}>
        PROJECTS
      </h3>

      <div className="flex flex-col gap-12">
        {projects.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 items-start text-left max-[650px]:flex-col"
          >
            <div className="flex-none w-[200px] max-[650px]:w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.1)] border-2"
                style={{
                  borderColor: theme.border_line_card,
                  backgroundColor: theme.highlight,
                }}
              />
            </div>

            <div className="flex-1 flex flex-col gap-2 items-start">
              <h2
                className="m-0 text-[1.4rem] font-extrabold"
                style={{ color: theme.accent }}
              >
                {item.title}
              </h2>

              <p
                className="text-[0.95rem] leading-relaxed m-0"
                style={{ color: theme.text, opacity: 0.85 }}
              >
                {item.desc}
              </p>

              <div
                className="text-[0.85rem] opacity-70 mt-1"
                style={{ color: theme.textSecondary }}
              >
                <span>tech: {item.tech}</span>
                <br />
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr
        className={dividerClass}
        style={{
          borderColor: theme.border_line_card,
        }}
      />

      <h3 className={groupTitleClass} style={{ color: theme.textSecondary }}>
        CERTIFICATIONS
      </h3>

      <div className="flex flex-col gap-12">
        {certification.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 items-start text-left max-[650px]:flex-col"
          >
            <div className="flex-none w-[200px] max-[650px]:w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.1)] border-2"
                style={{
                  borderColor: theme.border_line_card,
                  backgroundColor: theme.highlight,
                }}
              />
            </div>

            <div className="flex-1 flex flex-col gap-2 items-start">
              <h2
                className="m-0 text-[1.4rem] font-extrabold"
                style={{ color: theme.accent }}
              >
                {item.title}
              </h2>

              <p
                className="text-[0.95rem] leading-relaxed m-0"
                style={{ color: theme.text, opacity: 0.85 }}
              >
                {item.desc}
              </p>

              <div
                className="text-[0.85rem] opacity-70 mt-1"
                style={{ color: theme.textSecondary }}
              >
                <span>issued by: {item.issued}</span>
                <br />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-[60px] pt-[30px] pb-5 text-center text-[0.95rem] font-medium opacity-90 tracking-[0.5px]"
        style={{
          borderTop: `2px dashed ${theme.border_line_card}`,
          borderColor: theme.border_line_card,
          opacity: 0.5,
        }}
      >
        <p>
          for further works contact :
          <br className="block sm:hidden" />
          <a
            href="mailto:arrafipamungkas23@gmail.com"
            className="ml-2 no-underline font-bold py-1 px-2 rounded transition-all duration-200 ease-in-out hover:underline hover:bg-black/5 hover:-translate-y-px"
            style={{ color: theme.accent }}
          >
            arrafipamungkas23@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default RepoContent;

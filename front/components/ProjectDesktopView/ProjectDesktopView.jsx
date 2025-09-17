import React from "react";
import st from "./ProjectDesktopView.module.css";
import Markdown from "react-markdown";
import Button from "../Button/Button";
import Carousel from "../Carousel/Carousel";

const ProjectDesktopView = ({ project }) => {
  return (
    <>
      <Carousel images={project.images} />
      <div className={st.container}>
        <div className={st.contentWrapper}>
          <header className={st.header}>
            <Button className={st.button} title="Label" isBack link />
            <Button
              className={st.buttonBack}
              title="Назад"
              href="/projects"
              link
            />
          </header>
          <h1 className={st.title}>{project.title}</h1>
          <p>{project.content}</p>
          {project.paragraphs.map((paragraph) => (
            <Markdown
              key={paragraph.paragraphs}
              components={{
                ul: ({ children }) => <ul className={st.list}>{children}</ul>,
                li: ({ children }) => (
                  <li className={st.listItem}>{children}</li>
                ),
                p: ({ children }) => <p className={st.paragraph}>{children}</p>,
              }}
            >
              {paragraph.paragraphs}
            </Markdown>
          ))}
          <p>{project.year}</p>
          <p>{project.customer}</p>
          <div className={st.footer}>
            Правова інформація: використання будь-яких матеріалів, розміщених на
            сайті www.lineup.com, без письмового дозволу компанії ТОВ «LineUp»,
            є порушенням закону про авторське право.
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDesktopView;

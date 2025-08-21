import React from "react";
import Container from "../Container/Container";
import st from "./ProjectMobileView.module.css";
import Button from "../Button/Button";
import Carousel from "../Carousel/Carousel";
import Markdown from "react-markdown";

const ProjectMobileView = ({ project }) => {
  return (
    <>
      <Container className={st.container}>
        <div className={st.header}>
          <Button className={st.buttonMain} title="Label" isBack link />
          <Button
            className={st.buttonBack}
            title="Назад"
            href="/projects"
            link
          />
        </div>
        <p className={st.year}>{project.year}</p>
        <p className={st.title}>{project.title}</p>
        <p className={st.customer}>{project.customer}</p>
      </Container>

      <Carousel images={project.images} className={st.carousel}></Carousel>
      <Container className={st.container}>
        {project.paragraphs.map((paragraph) => (
          <Markdown
            key={paragraph.paragraphs}
            components={{
              ul: ({ children }) => <ul className={st.list}>{children}</ul>,
              li: ({ children }) => <li className={st.listItem}>{children}</li>,
              p: ({ children }) => <p className={st.paragraph}>{children}</p>,
            }}
          >
            {paragraph.paragraphs}
          </Markdown>
        ))}
        <div className={st.footer}>
          Правовая информация: использование любых материалов, размещенных на
          сайте www.art3d.ru, без письменного разрешения компании ООО «Арт
          3Д-Графикс», является нарушением закона об авторском праве.
        </div>
      </Container>
    </>
  );
};

export default ProjectMobileView;

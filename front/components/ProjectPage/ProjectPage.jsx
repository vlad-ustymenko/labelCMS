"use client";
import React from "react";
import ProjectMobileView from "../ProjectMobileView/ProjectMobileView";
import ProjectDesktopView from "../ProjectDesktopView/ProjectDesktopView";

const ProjectPage = ({ project }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return isMobile ? (
    <ProjectMobileView project={project} />
  ) : (
    <ProjectDesktopView project={project} />
  );
};

export default ProjectPage;

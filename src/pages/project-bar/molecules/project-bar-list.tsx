import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { useParams } from "react-router-dom";

import { RootState } from "@stores/store";
import { Project } from "@stores/projects/interfaces";

import { ProjectBarListItemZero } from "../atoms/project-bar-list-item-zero";
import { ProjectBarListItem } from "../atoms/project-bar-list-item";

import "../styles/project-bar-list.css";

export const ProjectBarList = () => {
  const { projectNumber } = useParams();
  const projectState = useSelector((state: RootState) => state.projectsState);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleProjectBarClick = (index: number) => {
    setSelectedIndex(index);
  }
  useEffect(() => {
    if (projectState && projectState.projects) {
      const projectExists = projectState.projects.some(e => e.projectNumber === projectNumber);
      if (!projectExists) {
        setSelectedIndex(null);
      } else {
        const index = projectState.projects.findIndex((e: Project) => e.projectNumber === projectNumber);
        setSelectedIndex(index);
      }
    }
  }, [projectNumber, projectState]);
  return (
    <div className="ProjectBarList">
      <Flipper flipKey={selectedIndex}>
        <div className="ProjectBarList__List">
          <ProjectBarListItemZero />
          {selectedIndex !== null && (
            <Flipped key={projectState.projects[selectedIndex]?.projectNumber} flipId={projectState.projects[selectedIndex]?.projectNumber}>
              <div onClick={() => handleProjectBarClick(selectedIndex)}>
                <ProjectBarListItem {...projectState.projects[selectedIndex]} />
              </div>
            </Flipped>
          )}
          {projectState.projects && projectState.projects.length !== 0 && projectState.projects.map((e: Project, index: number) => (
            index !== selectedIndex && (
              <Flipped key={e.projectNumber} flipId={e.projectNumber}>
                <div onClick={() => handleProjectBarClick(index)}>
                  <ProjectBarListItem {...e} />
                </div>
              </Flipped>
            )
          ))}
        </div>
      </Flipper>
    </div>
  );
};


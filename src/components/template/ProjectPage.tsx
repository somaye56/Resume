"use client"
import { ExternalLink } from "lucide-react";
import { useTranslations } from 'next-intl';
import Card from "../elements/Card";
import LineComponent from "../elements/LineComponent";

interface Project {
  name: string;
  link: string;
  description?: string;
  company: string;
  technologies?: string[];
}

const ProjectPage = () => {

  const Projects = useTranslations("projects");
  const projects = Projects.raw("items") as Project[];
  return (
    <>
      <section className="text-center">
        <h2 className="text-2xl font-bold mt-6 mb-3 inline-block">
          {Projects("title")}
        </h2>

        <LineComponent className="mb-6" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project: Project, i: number) => (
            <Card key={i} animated index={i} inViewOnly={true} >

              <div className="flex flex-col h-full text-left">

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold  transition-colors duration-300">
                    {project.name}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-bg-to group-hover:text-text-secondary50 transition-colors duration-300" />
                </div>


                {project.description && (
                  <p className="text-sm leading-relaxed mb-3 flex-grow">
                    {project.description}
                  </p>
                )}

                <p className="text-sm font-medium mb-2 text-card-bg">
                  {project.company}
                </p>
              </div>
            </Card>

          ))}
        </div>
      </section>

    </>
  )
}

export default ProjectPage

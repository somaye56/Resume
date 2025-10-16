"use client"
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from 'next-intl';
import React from 'react'
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
            <motion.a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className="group block h-[180px] bg-gradient-to-br  p-6 rounded-3xl shadow-md hover:shadow-lg transition-all bg-[#896C6C]/10  duration-300"
            >
              <div className="flex flex-col h-full text-left">
         
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-[#374151] group-hover:text-[#555879]/50 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-[#A2AF9B] group-hover:text-[#555879]/50 transition-colors duration-300" />
                </div>

       
                {project.description && (
                  <p className="text-sm text-slate-600 leading-relaxed mb-3 flex-grow">
                    {project.description}
                  </p>
                )}

          
                <p className="text-sm text-[#6B7280] font-medium mb-2">
                  {project.company}
                </p>

                {/* 🔸 Technologies */}
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-[#E5E7EB] text-[#324E2B] rounded-full font-medium group-hover:bg-[#A2AF9B]/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

    </>
  )
}

export default ProjectPage

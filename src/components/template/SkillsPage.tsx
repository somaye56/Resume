"use client"
import { useTranslations } from 'next-intl';
import React from 'react'
import {
    FaProjectDiagram,
    FaReact,
    FaServer,
    FaTools
} from "react-icons/fa";
import {
    SiRedux
} from "react-icons/si";
import LineComponent from '../elements/LineComponent';
import Card from '../elements/Card';

const SkillsPage = () => {
    const Skills = useTranslations("skills");

    const categories = [
        {
            key: "frontend",
            icon: <FaReact className="text-2xl text-[#61DAFB]" />,
            gradient: "from-blue-50 to-cyan-50",
            borderColor: "border-blue-200"
        },
        {
            key: "stateManagement",
            icon: <SiRedux className="text-2xl text-[#764ABC]" />,
            gradient: "from-purple-50 to-indigo-50",
            borderColor: "border-purple-200"
        },
        {
            key: "tools",
            icon: <FaTools className="text-2xl text-[#F7931E]" />,
            gradient: "from-orange-50 to-amber-50",
            borderColor: "border-orange-200"
        },
        {
            key: "architecture",
            icon: <FaProjectDiagram className="text-2xl text-[#10B981]" />,
            gradient: "from-emerald-50 to-green-50",
            borderColor: "border-emerald-200"
        },
        {
            key: "backend",
            icon: <FaServer className="text-2xl text-[#68A063]" />,
            gradient: "from-green-50 to-teal-50",
            borderColor: "border-green-200"
        },
    ];
    return (
        <>
            <section className="mb-16">
                <div className=" text-center">
                    <h2 className="text-2xl font-bold mt-6 mb-3 inline-block">
                        {Skills("title")}
                    </h2>
                </div>
                <LineComponent className="mb-6" />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-4 ">
                    {categories.map((category) => {
                        const title = Skills(`${category.key}.title`);
                        const items = Skills.raw(`${category.key}.items`);

                        return (
                            <Card className="hover:scale-[1.02]" key={category.key}>
                                <div className="flex  gap-3 mb-3">
                                    {category.icon}
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {title}
                                    </h3>
                                </div>
                                <ul className="flex flex-wrap gap-2 ">
                                    {items.map((skill: string) => (
                                        <li
                                            key={skill}
                                            className="text-sm font-medium bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white"
                                        >
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        );
                    })}
                </div>
            </section>
        </>
    )
}

export default SkillsPage

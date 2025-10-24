"use client"
import { useLocale, useTranslations } from 'next-intl';
import Card from "../elements/Card";
import LineComponent from "../elements/LineComponent";

interface ExperienceItem {
    position: string;
    years: string;
    company: string;
    city: string;
    responsibilities: string[];
}

const ExperiencePage = () => {
    const Experience = useTranslations("experience");
    const locale = useLocale();
    const experience: ExperienceItem[] = Experience.raw("items");
    const gapClass = locale === 'fa' ? 'gap-4' : 'gap-4';
    return (
        <>
            <section >
                <div className=" text-center">
                    <h2 className="text-2xl font-bold mt-6 mb-3 inline-block">
                        {Experience("title")}
                    </h2>
                </div>
                <LineComponent className="mb-6" />
                <div className = {`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  ${gapClass} mx-auto`}
                >
                    {experience.map((exp: ExperienceItem, i: number) => (
              
                             <Card key={i} animated index={i} inViewOnly={true} >
                             <div className="flex justify-between  gap-2 mb-2">
                                <h3 className="font-medium text-lg">
                                    {exp.position}
                                </h3>
                                <span className="text-sm text-text-secondary">{exp.years}</span>
                            </div>

                            <p className="text-sm text-custom-red font-semibold mb-1">
                                {exp.company}
                            </p>
                            <p className="text-xs text-text-secondary mb-3">{exp.city}</p>

                            <ul className="space-y-1 text-sm text-slate-600">
                                {exp.responsibilities.map((item: string, idx: number) => (
                                    <li key={idx} className="leading-relaxed">
                                        {item}
                                    </li>
                                ))}
                            </ul>

                             </Card>
             


               
                    ))}
                </div>
            </section>


        </>
    )
}

export default ExperiencePage

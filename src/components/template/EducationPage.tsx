"use client"
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import LineComponent from "../elements/LineComponent";

const EducationPage = () => {
    const Education = useTranslations("education");
    const education = Education.raw("items");
    return (
        <>
            <section >
                <div className=" text-center">
                    <h2 className="text-2xl font-bold mt-6 mb-3 inline-block">
                        {Education("title")}
                    </h2>
                </div>
                <LineComponent className="mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mx-auto justify-items-stretch ">
                    {education.map((exp: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.04 }}
                            className="group block w-full  bg-gradient-to-br  p-6 rounded-3xl shadow-md hover:shadow-lg transition-all bg-[#896C6C]/10  duration-300"
                        >
                            <div className="flex justify-between  gap-2 mb-2">
                                <h3 className="font-medium text-[#324E2B] text-lg">
                                    {exp.degree}
                                </h3>
                                <span className="text-sm text-slate-500">{exp.field}</span>
                            </div>

                            <p className="text-sm text-[#AF3E3E] font-medium mb-1">
                                {exp.university}
                            </p>
                            <p className="text-xs text-slate-500 mb-3">{exp.years}</p>
                        </motion.div>
                    ))}
                </div>
            </section>


        </>
    )
}

export default EducationPage

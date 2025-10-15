import React from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LineComponent from '../elements/LineComponent';
const AboutPage = () => {
    const About = useTranslations("about")
    const HomePage = useTranslations("homePage")

    return (
        <>

            <section className="grid md:grid-cols-3 gap-8  items-stretch mb-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="md:col-span-2 bg-gradient-to-br p-6 rounded-2xl shadow-md hover:shadow-lg transition-all bg-[#896C6C]/10"
                >
                    <h2 className="text-xl font-semibold mb-3  border-b-2 border-[#AF3E3E] inline-block pb-1">
                        {About("title")}
                    </h2>
                    <div className="text-slate-700  space-y-2 rtl:space-x-reverse">
                        <p>{About("SOne")}</p>
                        <p>{About("STwo")}</p>
                        <p>{About("STree")}</p>
                        <p>{About("SFour")}</p>
                        <p>{About("SFive")}</p>
                        <p>{About("SSix")}</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-[#896C6C]/10 backdrop-blur-lg p-6 rounded-2xl shadow-md transition-all"
                >
                    <Image
                        src="/profile.png"
                        alt="profile"
                        width={250}
                        height={200}

                        className="rounded-full mx-auto mb-4 "
                    />
                    <h3 className="text-sm text-center  mb-3 pb-1">
                        {HomePage("wellcome")}
                    </h3>
                    <LineComponent className="mb-4" />
                    <ul className="text-sm font-semibold  space-y-2">
                        <li className="flex items-center justify-center  gap-2">
                            {HomePage("name")} {HomePage("lastName")}
                        </li>
                        <li className="flex items-center justify-center gap-2">
                            {HomePage("job")}
                        </li>

                    </ul>
                </motion.div>
            </section>

        </>
    )
}

export default AboutPage

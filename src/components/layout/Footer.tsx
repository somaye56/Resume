"use client"
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const social = {
        linkedin: "https://linkedin.com/in/your-profile",
        github: "https://github.com/your-username", 
        email: "mailto:your-email@example.com"
    };
    
    return (
        <>
            <footer className="left-0 right-0 bottom-0 w-full text-center text-sm text-slate-400 py-4 border-t border-slate-200 mt-8">

                <div className="flex justify-center space-x-6 mb-3">
                    <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-custom-red transition-colors duration-200"
                    >
                        <FaLinkedin size={22} />
                    </a>
                    <a
                        href={social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-custom-red dark:hover:text-white transition-colors duration-200"
                    >
                        <FaGithub size={22} />
                    </a>
                    <a
                        href={social.email}
                        className="text-text-secondary hover:text-custom-red transition-colors duration-200"
                    >
                        <FaEnvelope size={22} />
                    </a>
                </div>
                © {new Date().getFullYear()} Somaye Baniasadi — Built with{" "}
                <span className="text-custom-red">Next.js</span> &{" "}
                <span className="text-custom-red">Tailwind CSS</span>
            </footer>
        </>
    )
}

export default Footer

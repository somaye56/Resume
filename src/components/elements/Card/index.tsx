import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;      
  index?: number;         
  inViewOnly?: boolean;    
}

export default function Card({
  children,
  className = "",
  animated = false,
  index = 0,
  inViewOnly = true,
}: CardProps) {
  const content = (
   
    <div
      className={`mb-6 rounded-2xl bg-gradient-to-br p-6 bg-card-bg/10 shadow-sm hover:shadow-md transition-all duration-300 h-full ${className}`}
    >
      {children}
    </div>
  );

  if (!animated) return content;


  const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={index}
      initial="hidden"
      animate={inViewOnly ? undefined : "visible"}
      whileInView={inViewOnly ? "visible" : undefined}
      variants={variants}
      whileHover={{ scale: 1.02, translateY: -8 }}
      transition={{
        delay: Number(index) * 0.1 || 0,
        duration: 0.3,
       
      }}
    >
      {content}
    </motion.div>
  );
}

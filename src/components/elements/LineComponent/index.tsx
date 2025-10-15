
import cn from "@/utils/clsxFun";
import React from "react";

const LineComponent = (props: { className?: string }) => {
      const { className } = props;

      return (
            <div
            className={cn(
                  "px-4 w-full relative line rounded-2xl flex justify-between items-center gap-2",
                  className
                )}
            />

      );
};

export default LineComponent;

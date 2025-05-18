import React from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  fluid?: boolean;
  noPadding?: boolean;
}

const Container = ({
  children,
  className,
  as: Component = "section",
  fluid = false,
  noPadding = false,
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        "mx-auto w-full",
        {
          "max-w-screen-xl": !fluid,
          "px-4 sm:px-6 lg:px-8": !noPadding,
        },
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container;

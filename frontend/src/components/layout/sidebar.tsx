import React, { useState } from "react";
import { SideNav } from "@/components/layout/side-nav";
import { NavItems } from "@/components/constants/side-nav";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `overflow-y-auto max-h-[calc(100vh - 4rem)] relative hidden h-screen border-r pt-20 md:block`,
        status && "duration-500",
        isOpen ? "w-1/4" : "w-[50px]",
        className
      )}
    >
      {isOpen ? (
        <BsArrowLeftShort
          className={cn(
            "absolute right-2 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
            //!isOpen && "rotate-180"
          )}
          onClick={handleToggle}
        />
      ) : (
        <BsArrowRightShort
          className={cn(
            "absolute right-2 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
            //!isOpen && "rotate-180"
          )}
          onClick={handleToggle}
        />
      )}
       {isOpen ? (
        <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <SideNav
              className={cn(
                "text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100",
                !isOpen ? "hidden" : "",
                className
              )}
              items={NavItems}
            />
          </div>
        </div>
      </div>
       ) : null}
    </nav>
  );
}

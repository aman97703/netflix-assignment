"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const MobileMenu = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
      <p
        className="text-white text-sm"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        Browse
      </p>
      <ChevronDown
        className={cn(
          "text-white transition",
          showMobileMenu ? "rotate-180" : "rotate-0"
        )}
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      />
      {showMobileMenu && (
        <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
          <div className="flex flex-col gap-4">
            <div className="px-3 text-center text-white hover:underline">
              Home
            </div>
            <div className="px-3 text-center text-white hover:underline">
              TV Series
            </div>
            <div className="px-3 text-center text-white hover:underline">
              Movies
            </div>
            <div className="px-3 text-center text-white hover:underline">
              My List
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;

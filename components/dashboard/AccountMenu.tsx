"use client";
import Image from "next/image";
import blueDefault from "@/assets/profile4.png";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SignOutButton from "../Home/SignOutButton";
import { cn } from "@/lib/utils";

interface AccountMenuProps {
  name: string | null | undefined;
}

const AccountMenu = ({ name }: AccountMenuProps) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  return (
    <div className="flex flex-row gap-2 cursor-pointer relative items-center">
      <div
        className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden"
        onClick={() => setShowAccountMenu(!showAccountMenu)}
      >
        <Image src={blueDefault} alt="blue profile" />
      </div>
      <ChevronDown
        className={cn(
          "text-white transition",
          showAccountMenu ? "rotate-180" : "rotate-0"
        )}
        onClick={() => setShowAccountMenu(!showAccountMenu)}
      />
      {showAccountMenu && (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-100 rounded-sm">
          <div className="flex flex-col gap-3">
            <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
              <Image
                src={blueDefault}
                alt="blue profile"
                className="w-8 rounded-md"
              />
              <p className="text-white text-sm group-hover/item:underline">
                {name}
              </p>
            </div>
            <hr className="bg-gray-600 border-0 h-px my-4" />
            <div className="px-3">
              <SignOutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;

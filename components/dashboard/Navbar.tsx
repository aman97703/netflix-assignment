"use client";

import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import { Bell, Search } from "lucide-react";
import AccountMenu from "./AccountMenu";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data, status } = useSession();

  return (
    <nav className="w-full fixed z-40">
      <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90">
        <Link href={"/dashboard"}>
          <Image src={Logo} alt="Netflix logo" className="h-12 w-[140px]" />
        </Link>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" route="/dashboard" />
          <NavbarItem label="TV Shows" route="/tvshows" />
          <NavbarItem label="Movies" route="/movies" />
          <NavbarItem label="My List" route="/list" />
        </div>
        <MobileMenu />
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <Search />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <Bell />
          </div>
          <AccountMenu
            name={status === "authenticated" ? data.user?.name : ""}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

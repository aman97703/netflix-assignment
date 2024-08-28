"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarItemProps {
  label: string;
  route: string;
}

const NavbarItem = ({ label, route }: NavbarItemProps) => {
  const currentPath = usePathname(); // Get the current pathname
  return (
    <Link href={route} passHref>
      <div
        className={cn(
          "cursor-pointer hover:text-gray-300 transition",
          currentPath === route ? "text-white" : "text-white/70"
        )}
      >
        {label}
      </div>
    </Link>
  );
};

export default NavbarItem;

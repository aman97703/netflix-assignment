import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { getUser } from "@/lib/getUser";
import SignOutButton from "./SignOutButton";
import MoveToSignInButton from "./MoveToSignInButton";
import Link from "next/link";

const Navbar = async () => {
  const user = await getUser();

  return (
    <nav className="px-12 py-5 flex justify-between items-center max-w-7xl m-auto relative z-10">
      <Link href={"/"}>
        <Image src={Logo} alt="Netflix logo" className="h-12 w-[140px]" />
      </Link>
      {user ? <SignOutButton /> : <MoveToSignInButton />}
    </nav>
  );
};

export default Navbar;

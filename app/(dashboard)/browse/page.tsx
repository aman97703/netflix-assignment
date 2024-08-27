import Image from "next/image";
import blueDefault from "@/assets/profile4.png";
import { getUser } from "@/lib/getUser";
import { redirectToSignIn } from "@/lib/redirectToSignIn";
import Link from "next/link";

const BroswePage = async () => {
  const user = await getUser();

  if (!user) {
    return redirectToSignIn();
  }
  return (
    <div className="flex items-center h-full w-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div>
            <div className="group flex-row w-44 mx-auto">
              <Link href={"/dashboard"}>
                <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                  <Image src={blueDefault} alt="blue profile" />
                </div>
                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                  {user.name}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroswePage;

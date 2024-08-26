// "use client";

import EmailHome from "@/components/Home/EmailHome";
import Navbar from "@/components/Home/Navbar";
import TrendingHome from "@/components/Home/TrendingHome";



export default function Home() {
  return (
    <main className="h-full">
      <div className="relative bg-bgAuth h-full w-full bg-cover bg-no-repeat bg-center ">
        <div className="absolute bg-black w-full h-full lg:bg-opacity-60" />
        <div className="absolute bg-black top-0 w-full h-24 lg:bg-opacity-50 z-0 shadow-black shadow-2xl" />
        <Navbar />
        <div className="max-w-7xl w-full m-auto flex justify-center items-center h-[calc(90vh-100px)]">
          <div className="relative z-10 text-white">
            <p className="text-white text-7xl font-bold text-center leading-normal">
              TV shows and more
              <br />
              Unlimited movies
            </p>
            <p className=" text-2xl mt-3 font-semibold text-center">
              Starts at ₹149. Cancel anytime.
            </p>
            <p className=" text-lg mt-5 font-normal text-center">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <EmailHome />
            </div>
          </div>
        </div>
        <TrendingHome/>
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";
import Logo from "@/assets/logo.svg";
import PeerInput from "@/components/PeerInput";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [varient, setVarient] = useState("login");

//   const toggleVarient = useCallback(())

  return (
    <main className="bg-bgAuth h-full relative w-full bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={Logo} alt="Netflix logo" className="h-12 w-[140px]" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Sign In</h2>
            <div className="flex flex-col gap-4">
              <PeerInput
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
              />
              <PeerInput
                id="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
              />
              <Button variant="destructive" className="w-full py-3 mt-10 text-base">Sign In</Button>
              <p className="text-neutral-500 mt-12 text-sm">
                First time using Netflix? <span className="text-white ml-1 hover:underline cursor-pointer">Create an Account</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

"use client";

import Image from "next/image";
import Logo from "@/assets/logo.svg";
import PeerInput from "@/components/PeerInput";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/actions/auth-actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const [varient, setVarient] = useState<"login" | "register">("login");

  const handleRegister = async () => {
    if (email && name && password) {
      const { message, success } = await registerUser(name, email, password);
      if (success) {
        setVarient("login");
      } else {
        toast({
          description: message,
        });
      }
    }
  };
  const handleLogin = async () => {
    if (email && password) {
      try {
        const res: any = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/browse",
        });
        if (res.ok) {
          router.push("/browse");
          toast({
            description: "Logged in successfully",
          });
        } else {
          toast({
            variant: "destructive",
            description: res.error,
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          description: "Please try again",
        });
      }
    }
  };

  return (
    <main className="bg-bgAuth h-full relative w-full bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Link href={"/"}>
            <Image src={Logo} alt="Netflix logo" className="h-12 w-[140px]" />
          </Link>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {varient === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {varient === "register" && (
                <PeerInput
                  id="name"
                  label="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              )}
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
              <Button
                variant="destructive"
                className="w-full py-3 mt-10 text-base"
                onClick={() => {
                  if (varient === "register") {
                    handleRegister();
                  } else {
                    handleLogin();
                  }
                }}
              >
                {varient === "login" ? "Sign In" : "Sign Up"}
              </Button>

              {/* <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <Button
                  size="icon"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 hover:bg-white transition"
                >
                  <FcGoogle size={30} />
                </Button>
                <Button
                  size="icon"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 hover:bg-white transition"
                  onClick={() =>
                    signIn("github", {
                      callbackUrl: "/dashboard",
                    })
                  }
                >
                  <FaGithub color="black" size={30} />
                </Button>
              </div> */}
              {varient === "login" ? (
                <p className="text-neutral-500 mt-12 text-sm">
                  New to Netflix?{" "}
                  <span
                    className="text-white ml-1 hover:underline cursor-pointer"
                    onClick={() => setVarient("register")}
                  >
                    Create an Account
                  </span>
                </p>
              ) : (
                <p className="text-neutral-500 mt-12 text-sm">
                  Already have an account?{" "}
                  <span
                    className="text-white ml-1 hover:underline cursor-pointer"
                    onClick={() => setVarient("login")}
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

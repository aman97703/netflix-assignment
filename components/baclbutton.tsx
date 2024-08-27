"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Backbutton = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <ArrowLeft className="text-white cursor-pointer" size={40} />
    </div>
  );
};

export default Backbutton;

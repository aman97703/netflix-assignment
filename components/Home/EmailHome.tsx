"use client";

import PeerInput from "@/components/PeerInput";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const EmailHome = () => {
  const [email, setEmail] = useState("");
  return (
    <>
      <PeerInput
        id="emailhome"
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 md:w-auto w-full"
      />
      <Button
        size="lg"
        variant={"destructive"}
        className="text-2xl font-bold py-3 min-h-max h-auto md:w-auto w-full"
      >
        Get Started <ChevronRight />
      </Button>
    </>
  );
};

export default EmailHome;

"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MoveToSignInButton = () => {
    const router = useRouter();
  return (
    <Button variant="destructive" onClick={() => router.push("/login")}>
      Sign In
    </Button>
  );
};

export default MoveToSignInButton;

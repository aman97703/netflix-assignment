"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <Button variant="destructive" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;

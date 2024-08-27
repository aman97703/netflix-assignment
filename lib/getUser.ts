import { getServerSession, NextAuthOptions } from "next-auth";
import { NEXT_AUTH } from "./auth";
import { User } from "@prisma/client";

export async function getUser() {
  const session = await getServerSession(NEXT_AUTH as NextAuthOptions);
  if (session && session.user) {
    return session.user as User;
  }
  return null;
}

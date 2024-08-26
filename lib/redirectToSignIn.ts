import { redirect } from "next/navigation";

export async function redirectToSignIn() {
  redirect("/login");
}

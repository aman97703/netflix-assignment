import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { compare } from "bcrypt";

export const NEXT_AUTH = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          throw new Error("Email Does not exist");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.password
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect Credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }: { session: any }) {
      try {
        if (session.user) {
          const user = await db.user.findUnique({
            where: {
              email: session.user.email!,
            },
          });
          if (user) {
            session.user = user;
            return session;
          } else {
            throw new Error("User not found");
          }
        } else {
          throw new Error("Invalid session");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Invalid session");
      }
    },
  },
  pages: "/login",
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_JWT_SECRET,
};

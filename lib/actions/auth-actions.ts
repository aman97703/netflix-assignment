"use server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { checkDatabaseConnection } from "../checkMongoConnection";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }
    const existingUser = await db.user.findFirst({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        message: "Email already exists",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
}

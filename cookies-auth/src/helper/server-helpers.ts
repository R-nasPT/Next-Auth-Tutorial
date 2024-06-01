import { IUser } from "@/app/types";
import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const { JWT_TOKEN } = process.env;
const isProduction = process.env.NODE_ENV === "production"; // ตรวจสอบว่าโหมดการทำงานปัจจุบันเป็น production หรือไม่

if (!JWT_TOKEN) throw new Error("Invalid env var: JWT_TOKEN");

// ฟังก์ชัน generateAuthToken สำหรับการสร้าง JWT โดยใช้ _id เป็น payload
export const generateAuthToken = (_id: string): string => {
  return jwt.sign({ _id }, JWT_TOKEN, { expiresIn: "7d" }); // สร้าง JWT ที่มี payload เป็น _id และใช้ JWT_TOKEN เป็น secret key พร้อมตั้งค่าให้หมดอายุใน 7 วัน
};

// ฟังก์ชัน setAuthCookies สำหรับการตั้งค่า cookie ที่ชื่อ "auth-token"
export const setAuthCookies = (value: string): void => {
  cookies().set({
    name: "auth-token",
    value: value,
    httpOnly: true, // กำหนดให้ cookie เป็น httpOnly เพื่อป้องกันการเข้าถึงจาก JavaScript ฝั่ง client
    secure: isProduction, // กำหนดให้ cookie เป็น secure เฉพาะในโหมด production
    sameSite: isProduction ? "strict" : "lax", // กำหนดค่า sameSite เป็น "strict" ใน production และ "lax" ในโหมดอื่นๆ
    maxAge: value ? 7 * 24 * 30 * 30 : 0, // กำหนดอายุของ cookie เป็น 7 วัน ถ้ามีค่า value ถ้าไม่มีจะลบ cookie ทันที (maxAge เป็น 0)
  });
};

// ----- คล้ายๆ middleware -----
export const isUserAuthorised = async () => {
  const token = cookies().get("auth-token")?.value;
  let user: IUser | null = null;

  if (token) {
    const data = jwt.verify(token, JWT_TOKEN);

    if (typeof data !== "string") {
      try {
        connectToMongoDB().catch((err) => {
          throw new Error(err);
        });
        user = await User.findById(data._id);
        return user;
      } catch (error) {
        return null;
      }
    }
    return user;
  }
  return user;
};

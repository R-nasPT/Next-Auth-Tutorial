import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const { JWT_TOKEN } = process.env;
const isProduction = process.env.NODE_ENV === "production";
if (!JWT_TOKEN) throw new Error("Invalid env var: JWT_TOKEN");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email)
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    if (!password)
      return NextResponse.json({
        success: false,
        error: "Password is require",
      });

    connectToMongoDB().catch((err) => NextResponse.json(err));
    const user = await User.findOne({ email }).select("password");

    if (!user)
      return NextResponse.json(
        { success: false, error: "User with this email does not exists" },
        { status: 400 }
      );

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect)
      return NextResponse.json(
        { success: false, error: "Incorrect password" },
        { status: 400 }
      );

    //------- setup Token --------
    const authToken = jwt.sign({ _id: user._id }, JWT_TOKEN as string, {
      expiresIn: "7d",
    });
    
    cookies().set({
      name: "auth-token",
      value: authToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 7 * 24 * 30 * 30,
    });

    return NextResponse.json(
      { success: true, msg: "User logged in successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

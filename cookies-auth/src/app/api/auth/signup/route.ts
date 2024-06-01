import { generateAuthToken, setAuthCookies } from "@/helper/server-helpers";
import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    connectToMongoDB().catch((err) => NextResponse.json(err));
    const userExists = await User.findOne({ email: email });

    if (userExists)
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 409 }
      );

    const newUser = await User.create({
      name,
      email,
      password,
    });

    const authToken = generateAuthToken(newUser._id); //<---สมัครสมาชิกยังไม่จำเป็นต้องใส่ cookie ก็ได้
    setAuthCookies(authToken); //<---สมัครสมาชิกยังไม่จำเป็นต้องใส่ cookie ก็ได้

    return NextResponse.json(
      { success: true, msg: "User logged in successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      for (let field in error.errors) {
        const msg = error.errors[field].message;
        return NextResponse.json({ success: false, error: msg });
      }
    }
    return NextResponse.json({ success: false, error });
  }
}

import { setAuthCookies } from "@/helper/server-helpers";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    setAuthCookies("");

    return NextResponse.json({
      success: true,
      msg: "User logged out successfully function 1",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

// -------------------------------------------

export async function DELETE(req: NextRequest) {
  try {
    cookies().delete('auth-token');

    return NextResponse.json(
      { success: true, msg: "User logged out successfully function 2" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

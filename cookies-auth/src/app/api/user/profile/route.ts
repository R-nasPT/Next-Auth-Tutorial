import { isUserAuthorised } from "@/helper/server-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    //is user authorised
    const user = await isUserAuthorised();

    if (!user)
      return NextResponse.json({
        success: false,
        error: "Please log in to view profile",
      });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

import connectToDatabase from "@/libs/mongodb";
import User from "@/models/userSchema";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await connectToDatabase();
    const newUser = await User.create({ name, email, password: hash });

    return Response.json(
      { message: "User registered successfully", newUser },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

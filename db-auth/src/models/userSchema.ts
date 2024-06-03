import mongoose, { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: "user",
    },
  },
  { timestamps: true }
);

// const User = mongoose.models.User || mongoose.model("User", userSchema);
const User = models.User || model("User", userSchema); //<--- อย่าใช้ Users มี s เพราะจะเกิด bug ใน next-auth
export default User;

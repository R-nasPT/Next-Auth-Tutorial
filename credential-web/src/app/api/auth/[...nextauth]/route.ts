import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // ชื่อของ provider ที่จะแสดงบนหน้าฟอร์มเข้าสู่ระบบ
      name: "Credentials",
      // กำหนดฟิลด์สำหรับฟอร์มบนหน้าล็อกอิน
      // คุณสามารถระบุฟิลด์ต่างๆ ที่ต้องการให้ผู้ใช้กรอก เช่น ชื่อผู้ใช้, รหัสผ่าน, โทเค็น 2FA เป็นต้น
      // สามารถส่งแอตทริบิวต์ HTML ใดๆ ให้กับแท็ก <input> ผ่านอ็อบเจกต์นี้ได้
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ฟังก์ชันนี้ต้องเขียนเองเพื่อตรวจสอบข้อมูลที่ผู้ใช้กรอก
        // และต้องส่งคืนวัตถุที่แทนผู้ใช้หรือค่าสถานะ false/null หากข้อมูลไม่ถูกต้อง
        // ตัวอย่างเช่น return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // สามารถใช้วัตถุ `req` เพื่อรับพารามิเตอร์เพิ่มเติม (เช่น ที่อยู่ IP ของคำขอ)

        const res = await fetch("https://www.melivecode.com/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();

        // หากไม่มีข้อผิดพลาดและมีข้อมูลผู้ใช้ ส่งคืนข้อมูลผู้ใช้
        if (response.status === "ok") {
          return response.user;
        }

        // ส่งคืน null หากไม่สามารถดึงข้อมูลผู้ใช้ได้
        return null; //เมื่อ login ไม่ผ่านให้ return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn", // หน้าเข้าสู่ระบบ
    // signOut: "/auth/signout", // หน้าลงชื่อออก
    // error: "/auth/error", // หน้าข้อผิดพลาด โดยมีรหัสข้อผิดพลาดส่งผ่าน query string เช่น ?error=
    // verifyRequest: "/auth/verify-request", // หน้าตรวจสอบคำขอ (ใช้สำหรับข้อความตรวจสอบอีเมล)
    // newUser: "/auth/new-user", // หน้าสำหรับผู้ใช้ใหม่ที่จะถูกนำไปเมื่อเข้าสู่ระบบครั้งแรก (ถ้าไม่ต้องการก็ลบ property นี้ออก)
  },
});

export { handler as GET, handler as POST };

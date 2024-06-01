// ทำเป็น helper function แล้วเอาไปใช้ในไฟล์อื่นๆ
export function assertIsString(value: any, name: string): asserts value is string {
    if (typeof value !== 'string') {
      throw new Error(`Invalid env var: ${name}`);
    }
  }
  
  // ยกตัวอย่างการใช้งาน
const { JWT_TOKEN } = process.env;
assertIsString(JWT_TOKEN, "JWT_TOKEN"); //<--- เช็คว่าค่าแรกตรงกับ string ที่กำหนดไว้ในค่าที่ 2 หรือเปล่า
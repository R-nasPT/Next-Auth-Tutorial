import { headers } from "next/headers";
import React from "react";

export default function Page() {
  const headerRequest = headers();
  const userHeader = headerRequest.get("user");
  const user = userHeader ? JSON.parse(userHeader) : null;

  console.log(userHeader);
  
  return <div>Manage Blog {user ? user.email : "No user data available"}</div>;
}

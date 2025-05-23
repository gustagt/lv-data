

import jwt from "jsonwebtoken";

export function isValidate(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const secret = process.env.JWT_SECRET!;
    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
}


export async function getAuthUsername(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  try {
    const secret = process.env.JWT_SECRET!;

    const decoded = jwt.verify(token, secret) as { username: string };
  
    return decoded.username;
  } catch (e){
    console.error("Error decoding token:", e);
    return null;
  }
}

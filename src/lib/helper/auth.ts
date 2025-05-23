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
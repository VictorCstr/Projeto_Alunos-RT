import crypto from "crypto";

export async function hashPassword(pass: string) {
  return crypto.createHash("sha256").update(pass).digest("hex");
}

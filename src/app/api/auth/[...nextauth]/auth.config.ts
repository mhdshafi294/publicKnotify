"use server";

import jwt from "jsonwebtoken";
import { readFileSync } from "fs";
import path from "path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAppleClientSecret() {
  const teamId = process.env.APPLE_TEAM_ID;
  const clientId = process.env.APPLE_CLIENT_ID;
  const keyId = process.env.APPLE_KEY_ID;

  const privateKeyPath = process.env.APPLE_PRIVATE_KEY_PATH;
  if (!privateKeyPath) {
    throw new Error("APPLE_PRIVATE_KEY_PATH environment variable is not set");
  }

  const privateKey = readFileSync(
    path.join(process.cwd(), privateKeyPath),
    "utf8"
  );

  if (!teamId || !clientId || !keyId) {
    throw new Error(
      "Missing required Apple authentication environment variables"
    );
  }

  const token = jwt.sign(
    {
      iss: teamId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 180,
      aud: "https://appleid.apple.com",
      sub: clientId,
    },
    privateKey,
    {
      algorithm: "ES256",
      header: {
        alg: "ES256",
        kid: keyId,
      },
    }
  );
  return token;
}

export async function getSession() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token");
  
  if (!sessionToken) {
    redirect("/sign-in");
  }
  
  return sessionToken;
}

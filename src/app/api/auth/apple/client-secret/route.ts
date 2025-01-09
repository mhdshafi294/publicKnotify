import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const teamId = process.env.APPLE_TEAM_ID;
    const clientId = process.env.APPLE_CLIENT_ID;
    const keyId = process.env.APPLE_KEY_ID;
    const privateKeyPath = process.env.APPLE_PRIVATE_KEY_PATH;

    if (!privateKeyPath) {
      throw new Error("APPLE_PRIVATE_KEY_PATH environment variable is not set");
    }

    if (!teamId || !clientId || !keyId) {
      throw new Error("Missing required Apple authentication environment variables");
    }

    const privateKey = readFileSync(path.join(process.cwd(), privateKeyPath), "utf8");

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

    return NextResponse.json({ clientSecret: token });
  } catch (error) {
    console.error("Error generating Apple client secret:", error);
    return NextResponse.json(
      { error: "Failed to generate client secret" },
      { status: 500 }
    );
  }
}

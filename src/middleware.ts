// Import necessary modules and types
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { CustomUser } from "./app/api/auth/[...nextauth]/authOptions";

// Define supported locales
const locales = ["ar", "en"];

// Define the pattern for public pages
const publicPagesPattern = new RegExp(
  `^(/(${locales.join(
    "|"
  )}))?(/(sign-in|sign-up)|/(user|podcaster|company)/(check-code|forgot-password|new-password|verification-code))$`,
  "i"
);

// Create an internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

// Create an authentication middleware
const authMiddleware = withAuth(
  // Callback function for successful authentication
  async function onSuccess(req: NextRequest) {
    // Retrieve the token from the request
    const token = await getToken({ req });

    // Check if token exists and whether it's expired
    if (
      !token ||
      (typeof token.exp === "number" && Date.now() >= token.exp * 1000)
    ) {
      // Token is either missing or expired, redirect to the sign-in page
      const url = new URL("/sign-in", req.url);
      return NextResponse.redirect(url);
    }

    const user = token as CustomUser;
    const userType = user?.type;

    // If user type is available
    if (userType) {
      const url = req.nextUrl.clone();
      const pathnameParts = url.pathname.split("/");
      const locale = pathnameParts[1];

      // Check if the pathname already includes the user type after locale
      if (pathnameParts[2] !== userType) {
        // Modify URL to include user type after locale
        url.pathname = `/${locale}/${userType}${url.pathname.substring(
          locale.length + 1
        )}`;
        return NextResponse.rewrite(url);
      }
    }
    // Proceed with internationalization middleware
    return intlMiddleware(req);
  },
  {
    // Callback function to check if the user is authorized
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    // Define the sign-in page
    pages: {
      signIn: "/sign-in",
    },
  }
);

// Main middleware function
export default function middleware(req: NextRequest) {
  const isPublicPage = publicPagesPattern.test(req.nextUrl.pathname);

  // If the request is for a public page, use internationalization middleware
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    // Otherwise, use authentication middleware
    return (authMiddleware as any)(req);
  }
}

// Define the configuration for the middleware matcher
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

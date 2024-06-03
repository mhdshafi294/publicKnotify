import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { CustomUser } from "./app/api/auth/[...nextauth]/authOptions";

const locales = ["ar", "en"];
const publicPagesPattern = new RegExp(
  `^(/(${locales.join(
    "|"
  )}))?(/(sign-in|sign-up)|/(user|podcaster|company)/(check-code|forgot-password|new-password|verification-code))$`,
  "i"
);

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  async function onSuccess(req: NextRequest) {
    const token = await getToken({ req });
    const user = token as CustomUser;
    const userType = user?.type;

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
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/sign-in",
    },
  }
);

export default function middleware(req: NextRequest) {
  const isPublicPage = publicPagesPattern.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

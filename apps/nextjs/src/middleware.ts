import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/create-plan",
    "/join-plan",
    "/download-app",
    "/meet-team",
    "/privacy-policy",
    "/remove-account-data",
    "/strava-success",
    "/terms-service",
    "/api/stripe/",
    "/api/strava/",
    "/api/upstash/",
    "/api/trpc/",
  ],
});

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     *
     * This includes images, and requests from TRPC.
     */
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
  ],
};

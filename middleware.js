import { auth } from "@/app/_lib/auth"
import {NextResponse} from "next/server";
import { getUserById } from "./app/_lib/data-service";

export async function middleware(request) {
  const res = NextResponse.next();
  const session = await auth();

  if(!session) {
    return res;
  }

  // Add restaurants to excluded paths and make the list more specific
  const excludePaths = [
    '/preferences', 
    '/api', 
    '/login', 
    '/restaurants',  // Add restaurants to excluded paths
    '_next', 
    '/static', 
    '/favicon.ico'
  ];

  // Check if the current path should be excluded
  if(excludePaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return res;
  }

  try {
    const user = await getUserById(session.user.id);
    // Check if user exists and has at least some preference data
    if(!user || !user.cuisine_preference) {
      return NextResponse.redirect(new URL('/preferences', request.url));
    }
  } catch (error) {
    console.error('Error in middleware:', error);
    // If there's an error, allow the request to continue
    return res;
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
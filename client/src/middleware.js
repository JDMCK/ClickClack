import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const url = request.nextUrl;

  // Typing test logic
  if (url.pathname.startsWith('/typing/test')) {
    const hasDataParam = url.searchParams.has('data');
    if (!hasDataParam) {
      url.pathname = '/typing/prompt';
      url.search = '';
      return NextResponse.redirect(url);
    }
  }

  // Profile route protection
  if (url.pathname === '/profile') {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      url.pathname = '/403';
      return NextResponse.redirect(url);
    }

    try {
      const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      const { payload } = await jwtVerify(token, SECRET_KEY);
      // console.log(payload)

      if (payload.isAdmin == "admin") {
        url.pathname = '/profile/admin';
      } else {
        url.pathname = '/profile/user';
      }

      return NextResponse.redirect(url);
    } catch (err) {
      console.error('JWT verification failed:', err);
      url.pathname = '/403';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/typing/test', '/profile/:path*'],
};

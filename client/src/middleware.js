import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const url = request.nextUrl;

  // Catches non logged in people
  // if (
  //   url.pathname !== '/' &&
  //   !url.pathname.startsWith('/auth') &&
  //   !url.pathname.startsWith('/_next') &&
  //   !url.pathname.startsWith('/favicon.ico')
  // ) {
  //   const token = request.cookies.get('token')?.value;
  
  //   if (!token) {
  //     console.log("NO TOKEN FOUND ❌❌❌ go root")
  //     url.pathname = '/';
  //     url.search = '';
  //     return NextResponse.redirect(url);
  //   }
  // }
  
  // Typing test logic
  // if (url.pathname.startsWith('/typing/test')) {
  //   const hasDataParam = url.searchParams.has('data');
  //   if (!hasDataParam) {
  //     url.pathname = '/typing/prompt';
  //     url.search = '';
  //     return NextResponse.redirect(url);
  //   }
  // }

  // // Profile route protection
  // if (url.pathname === '/profile') {
  //   const token = request.cookies.get('token')?.value;

  //   if (!token) {
  //     url.pathname = '/404';
  //     return NextResponse.redirect(url);
  //   }

  //   try {
  //     const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  //     const { payload } = await jwtVerify(token, SECRET_KEY);

  //     if (payload.isAdmin) {
  //       url.pathname = '/profile/admin';
  //     } else {
  //       url.pathname = '/profile/user';
  //     }

  //     return NextResponse.redirect(url);
  //   } catch (err) {
  //     console.error('JWT verification failed:', err);
  //     url.pathname = '/404';
  //     return NextResponse.redirect(url);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};

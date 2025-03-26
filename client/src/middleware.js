import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;

  // Only run on the test page
  if (url.pathname.startsWith('/typing/test')) {
    const hasDataParam = url.searchParams.has('data');

    if (!hasDataParam) {
      url.pathname = '/typing/prompt'; // redirect to homepage
      url.search = ''; // clear query string
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Optional: Limit middleware to just that route
export const config = {
  matcher: ['/typing/test'],
};

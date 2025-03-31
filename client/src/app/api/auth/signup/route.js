import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  const backendResponse = await fetch('https://web-w9x2a113zzck.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include'
  });

  const data = await backendResponse.json();
  
  const setCookieHeader = backendResponse.headers.get('set-cookie');
  const response = NextResponse.json(data, { status: backendResponse.status });

  if (setCookieHeader) {
    response.headers.set('set-cookie', setCookieHeader);
  }

  return response;
}
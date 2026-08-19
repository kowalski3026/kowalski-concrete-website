import { NextResponse } from 'next/server';

export function middleware(request) {
  return NextResponse.rewrite(new URL('/new2.html', request.url));
}

export const config = {
  matcher: '/',
};

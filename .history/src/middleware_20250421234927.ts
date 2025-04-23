import { NextRequest, NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
  
  const authToken = request.cookies.get('auth-token')?.value;
  

  
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/profile') 
  
  
  const isAuthPage = 
    request.nextUrl.pathname === '/logind'

  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/logind', request.url));
  }
  
  
  if (isAuthPage && authToken) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }
  
  // En cualquier otro caso, continuar con la solicitud
  return NextResponse.next();
}

// Configurar específicamente qué rutas usa el middleware
export const config = {
  matcher: [
    // Rutas protegidas
    '/profile',
    // Rutas de autenticación
    '/logind',
    '/registro'
  ],
};
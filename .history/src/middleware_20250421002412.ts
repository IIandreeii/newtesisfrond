import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtener el token de las cookies
  const authToken = request.cookies.get('auth-token')?.value;
  
  // Definir las rutas protegidas
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/profile') || 
    request.nextUrl.pathname.startsWith('/dashboard') || 
    request.nextUrl.pathname.startsWith('/admin');
  
  // Definir las rutas de autenticación
  const isAuthPage = 
    request.nextUrl.pathname === '/logind' || 
    request.nextUrl.pathname === '/registro';

  // Si es una ruta protegida y no hay token, redirigir al login
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/logind', request.url));
  }
  
  // Si es una página de auth y ya tiene token, redirigir al perfil
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
    '/profile/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
    // Rutas de autenticación
    '/logind',
    '/registro'
  ],
};
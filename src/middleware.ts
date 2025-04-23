import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtener el token desde las cookies del request (lado servidor)
  const storedToken = request.cookies.get('authToken')?.value;

  // Definir las rutas protegidas
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/profile');
  
  // Definir las rutas de autenticación
  const isAuthPage = request.nextUrl.pathname === '/logind';

  if (isProtectedRoute && !storedToken) {
    return NextResponse.redirect(new URL('/logind', request.url));
  }
  
  // Si es una página de auth y ya tiene token, redirigir al perfil
  if (isAuthPage && storedToken) {
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
    // Rutas de autenticación
    '/logind',
    '/registro'
  ],
};
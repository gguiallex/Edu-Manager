import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo-super-forte";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const url = request.nextUrl.pathname;

  // Rotas públicas (não precisam de login)
  const rotasPublicas = ["/login", "/Register", "/api/login"];

  // Se for rota pública → libera
  if (rotasPublicas.includes(url)) {
    return NextResponse.next();
  }

  // Se NÃO tiver token → redirecionar para login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validar token
  try {
    jwt.verify(token, SECRET);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.png|.*\\.jpg|favicon.ico).*)",
  ],
};

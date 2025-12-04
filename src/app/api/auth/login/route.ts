import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
    }

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Usuário ou senha incorretos." }, { status: 401 });
    }

    // Retornar apenas os campos seguros
    const user = rows[0];
    delete user.password;

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    console.error("Erro POST /api/auth/login:", err);
    return NextResponse.json({ error: "Erro no servidor." }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Usuário ou senha incorretos." },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: rows[0] }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro no servidor." },
      { status: 500 }
    );
  }
}

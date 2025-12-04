import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// RETORNA UM ÚNICO USUÁRIO POR ID
export async function GET(_: any, { params }: any) {
  const [rows]: any = await db.query(
    "SELECT * FROM users WHERE id = ?",
    [params.id]
  );

  return NextResponse.json(rows[0]);
}

// ATUALIZA UM USUÁRIO
export async function PUT(req: Request, { params }: any) {
  const { name, email } = await req.json();

  await db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, params.id]
  );

  return NextResponse.json({ message: "Usuário atualizado" });
}

// REMOVE UM USUÁRIO
export async function DELETE(_: any, { params }: any) {
  await db.query("DELETE FROM users WHERE id = ?", [params.id]);
  return NextResponse.json({ message: "Usuário removido" });
}

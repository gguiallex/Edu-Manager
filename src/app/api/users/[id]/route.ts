import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0)
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, email, role } = await request.json();

    console.log(`🔄 PUT /api/users/${id}:`, { name, email, role });

    await db.query(
      "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
      [name, email, role, id]
    );

    console.log("✅ Usuário atualizado");

    return NextResponse.json({ message: "Usuário atualizado com sucesso" });
  } catch (err: any) {
    console.error("❌ Erro PUT users:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return NextResponse.json({ message: "Usuário removido com sucesso" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
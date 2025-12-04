// app/api/classes/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log("🔍 GET /api/classes/:id → ID:", id);

    const [rows]: any = await db.query(
      "SELECT * FROM classes WHERE id = ?",
      [id]
    );

    if (rows.length === 0)
      return NextResponse.json({ error: "Turma não encontrada" }, { status: 404 });

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    console.error("❌ Erro GET:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, year } = await request.json();
    
    console.log(`🔄 PUT /api/classes/${id} →`, { name, year });

    const result = await db.query(
      "UPDATE classes SET name = ?, year = ? WHERE id = ?",
      [name, year, id]
    );

    console.log("✅ Turma atualizada");

    return NextResponse.json({
      success: true,
      message: "Turma atualizada com sucesso",
    });
  } catch (err: any) {
    console.error("❌ Erro PUT:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    console.log(`🗑️ DELETE /api/classes/${id}`);

    // Evita excluir turma com alunos
    const [students]: any = await db.query(
      "SELECT * FROM student_class WHERE class_id = ?",
      [id]
    );

    if (students.length > 0) {
      console.warn(`⚠️ Turma ${id} tem ${students.length} alunos vinculados`);
      return NextResponse.json(
        { error: "Não é possível excluir turma com alunos vinculados" },
        { status: 400 }
      );
    }

    await db.query("DELETE FROM classes WHERE id = ?", [id]);
    
    console.log("✅ Turma deletada");

    return NextResponse.json({
      success: true,
      message: "Turma removida",
    });
  } catch (err: any) {
    console.error("❌ Erro DELETE:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
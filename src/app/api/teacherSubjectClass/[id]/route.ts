// app/api/teacherSubjectClass/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/teacherSubjectClass/:id
 * Retorna vínculo professor ↔ matéria ↔ turma
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const [row]: any = await db.query(
      "SELECT * FROM teacher_subject_class WHERE id = ?",
      [id]
    );

    return NextResponse.json(row[0] ?? null);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * PUT /api/teacherSubjectClass/:id
 * Atualiza vínculo (trocar professor, matéria ou turma)
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { teacher_id, subject_id, class_id } = await request.json();

    await db.query(
      "UPDATE teacher_subject_class SET teacher_id = ?, subject_id = ?, class_id = ? WHERE id = ?",
      [teacher_id, subject_id, class_id, id]
    );

    return NextResponse.json({
      success: true,
      message: "Vínculo atualizado com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * DELETE /api/teacherSubjectClass/:id
 * Remove vínculo professor ↔ matéria ↔ turma
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    console.log(`🗑️ DELETE /api/teacherSubjectClass/${id}`);
    
    await db.query("DELETE FROM teacher_subject_class WHERE id = ?", [id]);
    
    return NextResponse.json({ message: "Atribuição removida com sucesso" });
  } catch (err: any) {
    console.error("❌ Erro DELETE teacherSubjectClass:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
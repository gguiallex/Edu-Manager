// app/api/students/class/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/students/class
 * Vincula um aluno a uma turma (student can have only one class).
 *
 * Body esperado:
 * {
 *   student_id: number,
 *   class_id: number
 * }
 *
 * Lógica:
 * - Se já existir um registro em student_class para esse aluno, atualiza para a nova turma.
 * - Caso contrário, insere um novo registro.
 */
export async function POST(req: Request) {
  try {
    const { student_id, class_id } = await req.json();

    // Verifica se aluno existe
    const [userRows]: any = await db.query("SELECT id FROM users WHERE id = ? AND role = 'student'", [
      student_id,
    ]);
    if (userRows.length === 0) {
      return NextResponse.json({ error: "Aluno não encontrado" }, { status: 404 });
    }

    // Verifica se turma existe
    const [classRows]: any = await db.query("SELECT id FROM classes WHERE id = ?", [class_id]);
    if (classRows.length === 0) {
      return NextResponse.json({ error: "Turma não encontrada" }, { status: 404 });
    }

    // Se já existe vínculo, atualiza; se não, insere
    const [existing]: any = await db.query("SELECT * FROM student_class WHERE student_id = ?", [
      student_id,
    ]);

    if (existing.length > 0) {
      await db.query("UPDATE student_class SET class_id = ? WHERE student_id = ?", [
        class_id,
        student_id,
      ]);
      return NextResponse.json({ success: true, message: "Turma atualizada para o aluno" });
    } else {
      await db.query("INSERT INTO student_class (student_id, class_id) VALUES (?, ?)", [
        student_id,
        class_id,
      ]);
      return NextResponse.json({ success: true, message: "Aluno vinculado à turma" });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * DELETE /api/students/class
 * Remove o vínculo aluno ↔ turma.
 *
 * Body esperado:
 * { student_id: number }
 */
export async function DELETE(req: Request) {
  try {
    const { student_id } = await req.json();
    await db.query("DELETE FROM student_class WHERE student_id = ?", [student_id]);
    return NextResponse.json({ success: true, message: "Vínculo removido" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

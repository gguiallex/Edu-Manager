// app/api/classes/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/classes/:id
 * Retorna informações de uma turma específica.
 */
export async function GET(_: any, { params }: any) {
  try {
    const [rows]: any = await db.query(
      `
      SELECT * FROM classes WHERE id = ?
      `,
      [params.id]
    );

    if (rows.length === 0)
      return NextResponse.json({ error: "Turma não encontrada" }, { status: 404 });

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * PUT /api/classes/:id
 * Atualiza nome ou ano da turma.
 */
export async function PUT(req: Request, { params }: any) {
  try {
    const { name, year } = await req.json();

    await db.query(
      `
      UPDATE classes
      SET name = ?, year = ?
      WHERE id = ?
      `,
      [name, year, params.id]
    );

    return NextResponse.json({
      success: true,
      message: "Turma atualizada com sucesso",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * DELETE /api/classes/:id
 * Remove turma do sistema.
 * (Somente permitido se nenhum aluno estiver nela)
 */
export async function DELETE(_: any, { params }: any) {
  try {
    // Evita excluir turma com alunos
    const [students]: any = await db.query(
      "SELECT * FROM student_class WHERE class_id = ?",
      [params.id]
    );

    if (students.length > 0)
      return NextResponse.json(
        { error: "Não é possível excluir turma com alunos vinculados" },
        { status: 400 }
      );

    await db.query("DELETE FROM classes WHERE id = ?", [params.id]);

    return NextResponse.json({
      success: true,
      message: "Turma removida",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

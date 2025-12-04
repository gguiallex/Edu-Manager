// app/api/subjects/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/subjects/:id
 * Retorna:
 * - dados da matéria
 * - lista de professores que lecionam essa matéria
 * - lista de turmas onde essa matéria é ensinada
 */
export async function GET(_: any, { params }: any) {
  const subjectId = params.id;

  try {
    // 1) Dados da matéria
    const [subject]: any = await db.query(
      "SELECT * FROM subjects WHERE id = ?",
      [subjectId]
    );

    if (subject.length === 0) {
      return NextResponse.json(
        { error: "Matéria não encontrada" },
        { status: 404 }
      );
    }

    // 2) Professores que ensinam essa matéria
    const [teachers]: any = await db.query(
      `
      SELECT 
        u.id AS teacher_id,
        u.name AS teacher_name,
        c.id AS class_id,
        c.name AS class_name
      FROM teacher_subject_class tsc
      JOIN users u ON u.id = tsc.teacher_id
      JOIN classes c ON c.id = tsc.class_id
      WHERE tsc.subject_id = ?
      ORDER BY u.name;
      `,
      [subjectId]
    );

    return NextResponse.json({
      ...subject[0],
      teachers,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/subjects/:id
 * Atualiza dados da matéria.
 *
 * Body:
 * {
 *   name?: string,
 *   description?: string
 * }
 */
export async function PUT(req: Request, { params }: any) {
  const subjectId = params.id;

  try {
    const { name, description } = await req.json();

    await db.query(
      `
      UPDATE subjects
      SET name = ?, description = ?
      WHERE id = ?
      `,
      [name, description, subjectId]
    );

    return NextResponse.json({
      success: true,
      message: "Matéria atualizada com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/subjects/:id
 * Remove matéria do sistema.
 * Também remove vínculos na tabela teacher_subject_class.
 */
export async function DELETE(_: any, { params }: any) {
  const subjectId = params.id;

  try {
    await db.query(
      "DELETE FROM teacher_subject_class WHERE subject_id = ?",
      [subjectId]
    );

    await db.query("DELETE FROM subjects WHERE id = ?", [subjectId]);

    return NextResponse.json({
      success: true,
      message: "Matéria removida com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}

// app/api/evaluations/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/evaluations/:id
 * Retorna os detalhes de uma avaliação.
 */
export async function GET(_: any, { params }: any) {
  try {
    const [rows]: any = await db.query(
      `
      SELECT e.*, cls.name AS class_name, sub.name AS subject_name, u.name AS teacher_name
      FROM evaluations e
      JOIN classes cls ON cls.id = e.class_id
      JOIN subjects sub ON sub.id = e.subject_id
      JOIN users u ON u.id = e.teacher_id
      WHERE e.id = ?
      `,
      [params.id]
    );

    if (rows.length === 0)
      return NextResponse.json({ error: "Avaliação não encontrada" }, { status: 404 });

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * PUT /api/evaluations/:id
 * Atualiza uma avaliação.
 */
export async function PUT(req: Request, { params }: any) {
  try {
    const { title, description, date } = await req.json();

    await db.query(
      `
      UPDATE evaluations
      SET title = ?, description = ?, date = ?
      WHERE id = ?
      `,
      [title, description, date, params.id]
    );

    return NextResponse.json({
      success: true,
      message: "Avaliação atualizada com sucesso",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * DELETE /api/evaluations/:id
 * Remove uma avaliação.
 */
export async function DELETE(_: any, { params }: any) {
  try {
    await db.query("DELETE FROM evaluations WHERE id = ?", [params.id]);

    return NextResponse.json({
      success: true,
      message: "Avaliação removida",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
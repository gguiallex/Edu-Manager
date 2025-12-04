// app/api/grades/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/grades/:id
 * Retorna uma única nota pelo ID.
 */
export async function GET(_: any, { params }: any) {
  try {
    const [rows]: any = await db.query(
      `
      SELECT g.*, u.name AS student_name, s.name AS subject_name
      FROM grades g
      JOIN users u ON u.id = g.student_id
      JOIN subjects s ON s.id = g.subject_id
      WHERE g.id = ?
      `,
      [params.id]
    );

    if (rows.length === 0)
      return NextResponse.json({ error: "Nota não encontrada" }, { status: 404 });

    return NextResponse.json(rows[0]);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * PUT /api/grades/:id
 * Atualiza uma nota.
 *
 * Body:
 * {
 *   grade?: number,
 *   evaluation_name?: string,
 *   date?: string
 * }
 */
export async function PUT(req: Request, { params }: any) {
  try {
    const { grade, evaluation_name, date } = await req.json();

    await db.query(
      `
      UPDATE grades
      SET grade = ?, evaluation_name = ?, date = ?
      WHERE id = ?
      `,
      [grade, evaluation_name, date, params.id]
    );

    return NextResponse.json({
      success: true,
      message: "Nota atualizada com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * DELETE /api/grades/:id
 * Remove uma nota.
 */
export async function DELETE(_: any, { params }: any) {
  try {
    await db.query("DELETE FROM grades WHERE id = ?", [params.id]);

    return NextResponse.json({
      success: true,
      message: "Nota removida",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
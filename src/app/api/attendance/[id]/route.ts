// app/api/attendance/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/attendance/:id
 * Retorna o registro de presença pelo ID.
 */
export async function GET(_: any, { params }: any) {
  try {
    const [rows]: any = await db.query(
      `
      SELECT a.*, u.name AS student_name, s.name AS subject_name
      FROM attendance a
      JOIN users u ON u.id = a.student_id
      JOIN subjects s ON s.id = a.subject_id
      WHERE a.id = ?
      `,
      [params.id]
    );

    if (rows.length === 0)
      return NextResponse.json({ error: "Registro não encontrado" }, { status: 404 });

    return NextResponse.json(rows[0]);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * PUT /api/attendance/:id
 * Atualiza status ou data de um registro de presença.
 *
 * Body:
 * {
 *   status?: "present" | "absent",
 *   date?: string
 * }
 */
export async function PUT(req: Request, { params }: any) {
  try {
    const { status, date } = await req.json();

    await db.query(
      `
      UPDATE attendance
      SET status = ?, date = ?
      WHERE id = ?
      `,
      [status, date, params.id]
    );

    return NextResponse.json({
      success: true,
      message: "Presença atualizada com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * DELETE /api/attendance/:id
 * Remove o registro de presença.
 */
export async function DELETE(_: any, { params }: any) {
  try {
    await db.query("DELETE FROM attendance WHERE id = ?", [params.id]);

    return NextResponse.json({
      success: true,
      message: "Registro removido",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
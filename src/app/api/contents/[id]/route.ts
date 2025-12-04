// app/api/contents/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/contents/:id
 * Retorna os detalhes de um conteúdo publicado.
 */
export async function GET(_: any, { params }: any) {
  try {
    const [rows]: any = await db.query(
      `
      SELECT c.*, u.name AS teacher_name, s.name AS subject_name, cls.name AS class_name
      FROM contents c
      JOIN users u ON u.id = c.teacher_id
      JOIN subjects s ON s.id = c.subject_id
      JOIN classes cls ON cls.id = c.class_id
      WHERE c.id = ?
      `,
      [params.id]
    );

    if (rows.length === 0)
      return NextResponse.json(
        { error: "Conteúdo não encontrado" },
        { status: 404 }
      );

    return NextResponse.json(rows[0]);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * PUT /api/contents/:id
 * Atualiza conteúdo criado pelo professor.
 *
 * Body:
 * {
 *   title?: string,
 *   description?: string,
 *   date?: string
 * }
 */
export async function PUT(req: Request, { params }: any) {
  try {
    const { title, description, date } = await req.json();

    await db.query(
      `
      UPDATE contents
      SET title = ?, description = ?, date = ?
      WHERE id = ?
      `,
      [title, description, date, params.id]
    );

    return NextResponse.json({
      success: true,
      message: "Conteúdo atualizado com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * DELETE /api/contents/:id
 * Remove conteúdo da plataforma.
 */
export async function DELETE(_: any, { params }: any) {
  try {
    await db.query("DELETE FROM contents WHERE id = ?", [params.id]);

    return NextResponse.json({
      success: true,
      message: "Conteúdo removido",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
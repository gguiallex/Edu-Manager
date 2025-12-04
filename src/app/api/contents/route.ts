// app/api/contents/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/contents
 * Lista todos os conteúdos postados por professores.
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        c.id,
        c.title,
        c.description,
        DATE_FORMAT(c.date, '%Y-%m-%d') AS date,
        u.name AS teacher_name,
        sub.name AS subject_name,
        cls.name AS class_name
      FROM contents c
      JOIN users u ON u.id = c.teacher_id
      JOIN subjects sub ON sub.id = c.subject_id
      JOIN classes cls ON cls.id = c.class_id
      ORDER BY c.date DESC
    `);

    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * POST /api/contents
 * Professor cria conteúdo para sua matéria/turma.
 *
 * Body:
 * {
 *   teacher_id: number,
 *   subject_id: number,
 *   class_id: number,
 *   title: string,
 *   description?: string,
 *   date?: string
 * }
 */
export async function POST(req: Request) {
  try {
    const {
      teacher_id,
      subject_id,
      class_id,
      title,
      description = null,
      date = null,
    } = await req.json();

    await db.query(
      `
      INSERT INTO contents (teacher_id, subject_id, class_id, title, description, date)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [teacher_id, subject_id, class_id, title, description, date]
    );

    return NextResponse.json({
      success: true,
      message: "Conteúdo publicado com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
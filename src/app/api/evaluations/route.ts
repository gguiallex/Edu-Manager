// app/api/evaluations/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/evaluations
 * Lista todas as avaliações registradas.
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        e.id,
        e.title,
        e.description,
        DATE_FORMAT(e.date, '%Y-%m-%d') AS date,
        cls.name AS class_name,
        sub.name AS subject_name,
        u.name AS teacher_name
      FROM evaluations e
      JOIN classes cls ON cls.id = e.class_id
      JOIN subjects sub ON sub.id = e.subject_id
      JOIN users u ON u.id = e.teacher_id
      ORDER BY e.date DESC
    `);

    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * POST /api/evaluations
 * Cria uma nova avaliação para uma turma e matéria.
 *
 * Body:
 * {
 *   class_id: number,
 *   subject_id: number,
 *   teacher_id: number,
 *   title: string,
 *   description?: string,
 *   date?: string
 * }
 */
export async function POST(req: Request) {
  try {
    const { class_id, subject_id, teacher_id, title, description = null, date = null } =
      await req.json();

    await db.query(
      `
      INSERT INTO evaluations (class_id, subject_id, teacher_id, title, description, date)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [class_id, subject_id, teacher_id, title, description, date]
    );

    return NextResponse.json({
      success: true,
      message: "Avaliação criada com sucesso",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
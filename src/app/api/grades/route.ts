// app/api/grades/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/grades
 * Lista todas as notas registradas no sistema.
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        g.id,
        g.grade,
        g.evaluation_name,
        DATE_FORMAT(g.date, '%Y-%m-%d') AS date,
        u.name AS student_name,
        s.name AS subject_name
      FROM grades g
      JOIN users u ON u.id = g.student_id
      JOIN subjects s ON s.id = g.subject_id
      ORDER BY g.date DESC
    `);

    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * POST /api/grades
 * Professor lança uma nova nota.
 *
 * Body:
 * {
 *   student_id: number,
 *   subject_id: number,
 *   grade: number (0-10),
 *   evaluation_name: string,
 *   date?: string (opcional)
 * }
 */
export async function POST(req: Request) {
  try {
    const { student_id, subject_id, grade, evaluation_name, date = null } =
      await req.json();

    await db.query(
      `
      INSERT INTO grades (student_id, subject_id, grade, evaluation_name, date)
      VALUES (?, ?, ?, ?, ?)
    `,
      [student_id, subject_id, grade, evaluation_name, date]
    );

    return NextResponse.json({
      success: true,
      message: "Nota lançada com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
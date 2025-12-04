// app/api/attendance/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/attendance
 * Retorna todas as presenças registradas no sistema.
 * Inclui nome do aluno, matéria e data.
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        a.id,
        a.student_id,
        u.name AS student_name,
        a.subject_id,
        s.name AS subject_name,
        a.status,
        DATE_FORMAT(a.date, '%Y-%m-%d') AS date
      FROM attendance a
      JOIN users u ON u.id = a.student_id
      JOIN subjects s ON s.id = a.subject_id
      ORDER BY a.date DESC
    `);

    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * POST /api/attendance
 * Lança presença ou falta de um aluno.
 *
 * Body:
 * {
 *   student_id: number,
 *   subject_id: number,
 *   status: "present" | "absent",
 *   date?: string (YYYY-MM-DD)
 * }
 */
export async function POST(req: Request) {
  try {
    const { student_id, subject_id, status, date = null } = await req.json();

    if (!["present", "absent"].includes(status)) {
      return NextResponse.json(
        { error: "Status deve ser present ou absent" },
        { status: 400 }
      );
    }

    await db.query(
      `
      INSERT INTO attendance (student_id, subject_id, status, date)
      VALUES (?, ?, ?, ?)
      `,
      [student_id, subject_id, status, date]
    );

    return NextResponse.json({
      success: true,
      message: "Presença registrada com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

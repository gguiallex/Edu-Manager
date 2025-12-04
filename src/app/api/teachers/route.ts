// app/api/teachers/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/teachers
 * Lista todos os professores com:
 * - dados do usuário
 * - matérias e turmas que lecionam (se existirem)
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        u.id AS teacher_id,
        u.name,
        u.email,
        t.degree,
        t.experience,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'subject', s.name,
            'subject_id', s.id,
            'class_id', c.id,
            'class_name', c.name
          )
        ) AS assignments
      FROM users u
      JOIN teachers t ON u.id = t.user_id
      LEFT JOIN teacher_subject_class tsc ON t.user_id = tsc.teacher_id
      LEFT JOIN subjects s ON s.id = tsc.subject_id
      LEFT JOIN classes c ON c.id = tsc.class_id
      GROUP BY u.id
      ORDER BY u.name
    `);

    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * POST /api/teachers
 * Cria um professor no sistema.
 *
 * Body:
 * {
 *   name,
 *   email,
 *   password,
 *   degree,
 *   experience
 * }
 */
export async function POST(req: Request) {
  try {
    const { name, email, password, degree = null, experience = null } =
      await req.json();

    // 1) Criar usuário
    const [result]: any = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'teacher')",
      [name, email, password]
    );

    const teacherId = result.insertId;

    // 2) Inserir dados de teacher
    await db.query(
      "INSERT INTO teachers (user_id, degree, experience) VALUES (?, ?, ?)",
      [teacherId, degree, experience]
    );

    return NextResponse.json({
      success: true,
      teacherId,
      message: "Professor criado com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

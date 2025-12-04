// app/api/students/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/students
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        u.id AS user_id,
        u.name,
        u.email,
        s.responsible,
        s.responsible_phone,
        sc.class_id,
        c.name AS class_name,
        c.year AS class_year
      FROM users u
      JOIN students s ON u.id = s.user_id
      LEFT JOIN student_class sc ON u.id = sc.student_id
      LEFT JOIN classes c ON sc.class_id = c.id
      ORDER BY u.name
    `);
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * POST /api/students
 * Cria aluno ou vincula a turma
 */
export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      password,
      responsible = null,
      responsible_phone = null,
      class_id = null,
      user_id = null,
    } = await req.json();

    let userId = user_id;

    // Se não forneceu user_id, cria novo usuário
    if (!userId) {
      const [result]: any = await db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'student')",
        [name, email, password]
      );
      userId = result.insertId;

      await db.query(
        "INSERT INTO students (user_id, responsible, responsible_phone) VALUES (?, ?, ?)",
        [userId, responsible, responsible_phone]
      );
    }

    // Vincular turma se fornecida
    if (class_id) {
      await db.query("DELETE FROM student_class WHERE student_id = ?", [userId]);
      await db.query("INSERT INTO student_class (student_id, class_id) VALUES (?, ?)", [
        userId,
        class_id,
      ]);
    }

    return NextResponse.json({ success: true, userId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
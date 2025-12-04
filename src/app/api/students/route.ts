// app/api/students/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/students
 * Retorna a lista de todos os alunos com dados básicos:
 * - user.id, name, email
 * - dados da tabela students (responsible, responsible_phone)
 * - turma (se existir): class_id e class_name
 *
 * JOIN usado: users -> students -> student_class -> classes
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
      LEFT JOIN student_class sc ON s.user_id = sc.student_id
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
 * Cria um novo usuário com role = 'student', cria o registro na tabela students,
 * e opcionalmente vincula o aluno a uma turma (class_id).
 *
 * Body esperado (JSON):
 * {
 *   name: string,
 *   email: string,
 *   password: string,
 *   responsible?: string,
 *   responsible_phone?: string,
 *   class_id?: number   // opcional: já vincula o aluno à turma
 * }
 *
 * Retorna: { success: true, userId }
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
    } = await req.json();

    // Cria usuário com role student
    const [result]: any = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'student')",
      [name, email, password]
    );

    const userId = (result as any).insertId;

    // Insere dados específicos de student
    await db.query(
      "INSERT INTO students (user_id, responsible, responsible_phone) VALUES (?, ?, ?)",
      [userId, responsible, responsible_phone]
    );

    // Se class_id fornecido, vincula (se já existir vínculo, substitui)
    if (class_id) {
      // Remove vínculo anterior (se houver) e insere o novo (student pode ter apenas 1 turma)
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

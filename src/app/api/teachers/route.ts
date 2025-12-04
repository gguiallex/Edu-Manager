// app/api/teachers/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/teachers
 * Lista todos os professores
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        u.id AS teacher_id,
        u.name,
        u.email,
        t.specialization
      FROM users u
      JOIN teachers t ON u.id = t.user_id
      ORDER BY u.name
    `);

    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * POST /api/teachers
 * Cria um professor no sistema (já usa POST /api/users com role=teacher)
 */
export async function POST(req: Request) {
  try {
    const { name, email, password, specialization = null } = await req.json();

    // Criar via /api/users
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role: "teacher" }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    // Atualizar especialização se fornecida
    if (specialization) {
      await db.query(
        "UPDATE teachers SET specialization = ? WHERE user_id = ?",
        [specialization, data.userId]
      );
    }

    return NextResponse.json({
      success: true,
      teacherId: data.userId,
      message: "Professor criado com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
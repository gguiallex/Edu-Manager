// app/api/teachers/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/teachers/:id
 * Retorna perfil completo do professor + turmas + matérias
 */
export async function GET(_: any, { params }: any) {
  const teacherId = params.id;

  try {
    const [profile]: any = await db.query(
      `
      SELECT 
        u.id AS teacher_id,
        u.name,
        u.email,
        u.phone,
        t.degree,
        t.experience
      FROM users u
      JOIN teachers t ON u.id = t.user_id
      WHERE u.id = ?
      `,
      [teacherId]
    );

    if (profile.length === 0) {
      return NextResponse.json(
        { error: "Professor não encontrado" },
        { status: 404 }
      );
    }

    const [assignments]: any = await db.query(
      `
      SELECT 
        sub.id AS subject_id,
        sub.name AS subject_name,
        c.id AS class_id,
        c.name AS class_name
      FROM teacher_subject_class tsc
      JOIN subjects sub ON sub.id = tsc.subject_id
      JOIN classes c ON c.id = tsc.class_id
      WHERE tsc.teacher_id = ?
      `,
      [teacherId]
    );

    return NextResponse.json({
      ...profile[0],
      assignments,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * PUT /api/teachers/:id
 * Atualiza dados do professor (users + teachers)
 */
export async function PUT(req: Request, { params }: any) {
  const teacherId = params.id;

  try {
    const { name, email, degree, experience } = await req.json();

    // Atualiza users
    await db.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, teacherId]
    );

    // Atualiza teachers
    await db.query(
      "UPDATE teachers SET degree = ?, experience = ? WHERE user_id = ?",
      [degree, experience, teacherId]
    );

    return NextResponse.json({
      success: true,
      message: "Professor atualizado com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * DELETE /api/teachers/:id
 * Deleta o professor do sistema (deleta users → cascata para teachers).
 */
export async function DELETE(_: any, { params }: any) {
  const teacherId = params.id;

  try {
    await db.query("DELETE FROM users WHERE id = ?", [teacherId]);
    return NextResponse.json({
      success: true,
      message: "Professor removido com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
// app/api/teacherSubjectClass/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/teacherSubjectClass
 * Retorna todas as combinações professor ↔ matéria ↔ turma
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        tsc.id AS link_id,
        u.name AS teacher_name,
        tsc.teacher_id,
        sub.name AS subject_name,
        tsc.subject_id,
        c.name AS class_name,
        tsc.class_id
      FROM teacher_subject_class tsc
      JOIN users u ON u.id = tsc.teacher_id
      JOIN subjects sub ON sub.id = tsc.subject_id
      JOIN classes c ON c.id = tsc.class_id
      ORDER BY c.name, sub.name
    `);

    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * POST /api/teacherSubjectClass
 * Atribui professor ↔ matéria ↔ turma
 *
 * Regras:
 * - uma matéria NÃO pode se repetir na mesma turma
 */
export async function POST(req: Request) {
  try {
    const { teacher_id, subject_id, class_id } = await req.json();

    // Verifica duplicidade (matéria repetida na turma)
    const [dup]: any = await db.query(
      `SELECT id FROM teacher_subject_class 
       WHERE subject_id = ? AND class_id = ?`,
      [subject_id, class_id]
    );

    if (dup.length > 0) {
      return NextResponse.json(
        { error: "Essa matéria já foi atribuída a outro professor nessa turma" },
        { status: 400 }
      );
    }

    await db.query(
      "INSERT INTO teacher_subject_class (teacher_id, subject_id, class_id) VALUES (?, ?, ?)",
      [teacher_id, subject_id, class_id]
    );

    return NextResponse.json({
      success: true,
      message: "Professor atribuído com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

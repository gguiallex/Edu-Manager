// app/api/teacherSubjectClass/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/teacherSubjectClass
 * Retorna todas as combinações professor ↔ matéria ↔ turma
 * 
 * Query params:
 * - class_id: Filtrar por turma (opcional)
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const classId = url.searchParams.get("class_id");

    let query = `
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
      LEFT JOIN subjects sub ON sub.id = tsc.subject_id
      LEFT JOIN classes c ON c.id = tsc.class_id
    `;

    let params: any[] = [];

    if (classId) {
      query += ` WHERE tsc.class_id = ?`;
      params.push(classId);
    }

    query += ` ORDER BY c.name, sub.name`;

    const [rows]: any = await db.query(query, params);

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
 * - teacher_id deve estar na tabela teachers
 */
export async function POST(req: Request) {
  try {
    const { teacher_id, subject_id, class_id } = await req.json();

    console.log("📤 POST /api/teacherSubjectClass:", { teacher_id, subject_id, class_id });

    // Verifica se o professor existe
    const [teacher]: any = await db.query(
      "SELECT * FROM teachers WHERE user_id = ?",
      [teacher_id]
    );

    if (teacher.length === 0) {
      return NextResponse.json(
        { error: "Professor não encontrado" },
        { status: 400 }
      );
    }

    // Verifica se a matéria existe
    const [subject]: any = await db.query(
      "SELECT * FROM subjects WHERE id = ?",
      [subject_id]
    );

    if (subject.length === 0) {
      return NextResponse.json(
        { error: "Matéria não encontrada" },
        { status: 400 }
      );
    }

    // Verifica se a turma existe
    const [cls]: any = await db.query(
      "SELECT * FROM classes WHERE id = ?",
      [class_id]
    );

    if (cls.length === 0) {
      return NextResponse.json(
        { error: "Turma não encontrada" },
        { status: 400 }
      );
    }

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

    console.log("✅ Atribuição criada com sucesso");

    return NextResponse.json({
      success: true,
      message: "Professor atribuído com sucesso",
    });
  } catch (e: any) {
    console.error("❌ Erro POST teacherSubjectClass:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
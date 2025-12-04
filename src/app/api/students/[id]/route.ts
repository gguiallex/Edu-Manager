// app/api/students/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/students/:id
 * Retorna o perfil completo do aluno, suas informações de usuário,
 * a turma (se houver), as matérias da turma e:
 * - grades: lista de notas por subject (com média por matéria)
 * - attendanceSummary: total de aulas e total de faltas por matéria
 *
 * Esse endpoint consolida as consultas necessárias para montar o boletim do aluno.
 */
export async function GET(_: any, { params }: any) {
  const studentId = params.id;
  try {
    // 1) Perfil do usuário + dados da tabela students + turma
    const [profileRows]: any = await db.query(
      `
      SELECT u.id AS user_id, u.name, u.email, u.phone,
             s.responsible, s.responsible_phone,
             sc.class_id, c.name AS class_name, c.year AS class_year
      FROM users u
      JOIN students s ON u.id = s.user_id
      LEFT JOIN student_class sc ON s.user_id = sc.student_id
      LEFT JOIN classes c ON sc.class_id = c.id
      WHERE u.id = ?
      `,
      [studentId]
    );

    const profile = profileRows[0] ?? null;
    if (!profile) {
      return NextResponse.json({ error: "Aluno não encontrado" }, { status: 404 });
    }

    // 2) Notas por matéria com média (boletim)
    const [gradesRows]: any = await db.query(
      `
      SELECT sub.id AS subject_id, sub.name AS subject_name,
             AVG(g.grade) AS average,
             JSON_ARRAYAGG(JSON_OBJECT(
               'id', g.id,
               'grade', g.grade,
               'evaluation_name', g.evaluation_name,
               'date', DATE_FORMAT(g.date, '%Y-%m-%d')
             )) AS grades
      FROM grades g
      JOIN subjects sub ON g.subject_id = sub.id
      WHERE g.student_id = ?
      GROUP BY sub.id, sub.name
      `,
      [studentId]
    );

    // 3) Attendance summary por matéria
    const [attendanceRows]: any = await db.query(
      `
      SELECT sub.id AS subject_id, sub.name AS subject_name,
             SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absences,
             COUNT(*) AS total_classes
      FROM attendance a
      JOIN subjects sub ON a.subject_id = sub.id
      WHERE a.student_id = ?
      GROUP BY sub.id, sub.name
      `,
      [studentId]
    );

    // 4) Matérias da turma do aluno (se tiver turma)
    let classSubjects: any[] = [];
    if (profile.class_id) {
      const [subRows]: any = await db.query(
        `
        SELECT sub.id AS subject_id, sub.name AS subject_name, tsc.teacher_id
        FROM teacher_subject_class tsc
        JOIN subjects sub ON tsc.subject_id = sub.id
        WHERE tsc.class_id = ?
        `,
        [profile.class_id]
      );
      classSubjects = subRows;
    }

    return NextResponse.json({
      profile,
      grades: gradesRows,
      attendanceSummary: attendanceRows,
      classSubjects,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * PUT /api/students/:id
 * Atualiza dados do aluno (name, email, responsible, responsible_phone).
 * Atualiza a tabela users e students.
 */
export async function PUT(req: Request, { params }: any) {
  const studentId = params.id;
  try {
    const { name, email, responsible, responsible_phone } = await req.json();

    // Atualiza users
    await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      studentId,
    ]);

    // Atualiza students
    await db.query(
      "UPDATE students SET responsible = ?, responsible_phone = ? WHERE user_id = ?",
      [responsible, responsible_phone, studentId]
    );

    return NextResponse.json({ success: true, message: "Aluno atualizado" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * DELETE /api/students/:id
 * Remove o aluno do sistema (deleta users -> ON DELETE CASCADE remove students e student_class se FK configurada).
 */
export async function DELETE(_: any, { params }: any) {
  const studentId = params.id;
  try {
    await db.query("DELETE FROM users WHERE id = ?", [studentId]);
    return NextResponse.json({ success: true, message: "Aluno removido" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

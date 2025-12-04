import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/users
 * Lista todos os usuários
 */
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao listar usuários", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users
 * Cria um novo usuário (aluno, professor ou gestor)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role, phone = null } = body;

    console.log("📤 POST /api/users:", { name, email, role });

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Nome, email, senha e role são obrigatórios" },
        { status: 400 }
      );
    }

    // Inserir usuário
    const [result]: any = await db.query(
      `INSERT INTO users (name, email, password, role, phone)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, password, role, phone]
    );

    const userId = result.insertId;
    console.log(`✅ Usuário criado com ID: ${userId}`);

    // Se for professor, criar registro na tabela teachers
    if (role === "teacher") {
      await db.query(
        "INSERT INTO teachers (user_id, specialization) VALUES (?, NULL)",
        [userId]
      );
      console.log(`✅ Registro de professor criado para user_id: ${userId}`);
    }

    // Se for aluno, criar registro na tabela students
    if (role === "student") {
      await db.query(
        "INSERT INTO students (user_id, responsible, responsible_phone) VALUES (?, NULL, NULL)",
        [userId]
      );
      console.log(`✅ Registro de aluno criado para user_id: ${userId}`);
    }

    return NextResponse.json({ 
      success: true,
      userId,
      message: `${role === 'teacher' ? 'Professor' : role === 'student' ? 'Aluno' : 'Usuário'} criado com sucesso`
    });
  } catch (error: any) {
    console.error("❌ Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário", details: error.message },
      { status: 500 }
    );
  }
}
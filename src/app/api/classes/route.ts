// app/api/classes/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/classes
 * Lista todas as turmas da escola.
 */
export async function GET() {
  try {
    console.log("📌 [GET] /api/classes → Executando SELECT...");

    const result = await db.query(`SELECT * FROM classes ORDER BY name ASC`);

    console.log("📌 Resultado bruto vindo do MySQL:", result);

    const [rows] = result;

    console.log("📌 Rows formatados:", rows);

    // Garante que SEMPRE retorna array
    if (!Array.isArray(rows)) {
      console.error("❌ ERRO: O retorno da query NÃO é um array!");
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(rows);
  } catch (err: any) {
    console.error("❌ ERRO NO SELECT:", err);
    return NextResponse.json(
      {
        error: true,
        message: "Erro ao consultar classes",
        details: err.message,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/classes
 * Cria uma nova turma.
 */
export async function POST(req: Request) {
  try {
    console.log("📌 [POST] /api/classes → Criando nova turma");

    const body = await req.json();
    console.log("📌 Body recebido:", body);

    const { name, year } = body;

    await db.query(
      `INSERT INTO classes (name, year) VALUES (?, ?)`,
      [name, year]
    );

    return NextResponse.json({
      success: true,
      message: "Turma criada com sucesso",
    });
  } catch (err: any) {
    console.error("❌ ERRO NO INSERT:", err);

    return NextResponse.json(
      {
        error: true,
        message: "Erro ao criar turma",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
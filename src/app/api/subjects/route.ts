// app/api/subjects/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/subjects
 * Lista todas as matérias cadastradas no sistema.
 */
export async function GET() {
  try {
    console.log("📌 GET /api/subjects");
    
    const [rows]: any = await db.query(`
      SELECT id, name
      FROM subjects
      ORDER BY name
    `);

    console.log("✅ Matérias carregadas:", rows.length);
    return NextResponse.json(rows);
  } catch (e: any) {
    console.error("❌ Erro GET subjects:", e);
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/subjects
 * Cria uma nova matéria.
 *
 * Body:
 * {
 *   name: string
 * }
 */
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    
    console.log("📤 POST /api/subjects - Recebido:", { name });

    if (!name) {
      return NextResponse.json(
        { error: "Nome da matéria é obrigatório" },
        { status: 400 }
      );
    }

    // Evitar duplicidade de nome
    const [exists]: any = await db.query(
      "SELECT id FROM subjects WHERE name = ?",
      [name]
    );

    if (exists.length > 0) {
      console.warn("⚠️ Matéria duplicada:", name);
      return NextResponse.json(
        { error: "Já existe uma matéria com esse nome" },
        { status: 400 }
      );
    }

    // Inserir matéria
    await db.query(
      "INSERT INTO subjects (name) VALUES (?)",
      [name]
    );
    
    console.log("✅ Matéria criada com sucesso");

    return NextResponse.json({
      success: true,
      message: "Matéria criada com sucesso",
    }, { status: 200 });
  } catch (e: any) {
    console.error("❌ Erro POST subjects:", e);
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
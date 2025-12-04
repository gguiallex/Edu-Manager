// app/api/subjects/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/subjects
 * Lista todas as matérias cadastradas no sistema.
 * Retorna: id, name, description (se houver)
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT id, name, description
      FROM subjects
      ORDER BY name
    `);

    return NextResponse.json(rows);
  } catch (e: any) {
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
 *   name: string,
 *   description?: string
 * }
 */
export async function POST(req: Request) {
  try {
    const { name, description = null } = await req.json();

    // Evitar duplicidade de nome
    const [exists]: any = await db.query(
      "SELECT id FROM subjects WHERE name = ?",
      [name]
    );

    if (exists.length > 0) {
      return NextResponse.json(
        { error: "Já existe uma matéria com esse nome" },
        { status: 400 }
      );
    }

    // Inserir matéria
    await db.query(
      "INSERT INTO subjects (name, description) VALUES (?, ?)",
      [name, description]
    );

    return NextResponse.json({
      success: true,
      message: "Matéria criada com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
// app/api/classes/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/classes
 * Lista todas as turmas da escola.
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT * FROM classes ORDER BY name ASC
    `);

    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * POST /api/classes
 * Cria uma nova turma.
 *
 * Body:
 * {
 *   name: string,
 *   year: number
 * }
 */
export async function POST(req: Request) {
  try {
    const { name, year } = await req.json();

    await db.query(
      `
      INSERT INTO classes (name, year)
      VALUES (?, ?)
      `,
      [name, year]
    );

    return NextResponse.json({
      success: true,
      message: "Turma criada com sucesso",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
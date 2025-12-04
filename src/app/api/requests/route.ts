// app/api/requests/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/requests
 * Lista todas as solicitações de cadastro.
 * Cada solicitação contém:
 * - name
 * - email
 * - role solicitado (student, teacher)
 * - status (pending, approved, rejected)
 */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT id, name, email, role, status, created_at
      FROM requests
      ORDER BY created_at DESC
    `);

    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * POST /api/requests
 * Cria uma nova solicitação de cadastro.
 *
 * Body esperado:
 * {
 *   name: string,
 *   email: string,
 *   role: "student" | "teacher"
 * }
 */
export async function POST(req: Request) {
  try {
    const { name, email, role } = await req.json();

    await db.query(
      "INSERT INTO requests (name, email, role, status) VALUES (?, ?, ?, 'pending')",
      [name, email, role]
    );

    return NextResponse.json({
      success: true,
      message: "Solicitação enviada com sucesso",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

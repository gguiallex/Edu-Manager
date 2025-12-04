// app/api/requests/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/requests/:id
 * Retorna uma única solicitação pelo ID.
 */
export async function GET(_: any, { params }: any) {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM requests WHERE id = ?",
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Solicitação não encontrada" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * PATCH /api/requests/:id
 * Atualiza o status de uma solicitação.
 *
 * Body:
 * {
 *   status: 'approved' | 'rejected'
 * }
 */
export async function PATCH(req: Request, { params }: any) {
  try {
    const { status } = await req.json();

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Status inválido" },
        { status: 400 }
      );
    }

    await db.query(
      "UPDATE requests SET status = ? WHERE id = ?",
      [status, params.id]
    );

    return NextResponse.json({
      success: true,
      message: `Solicitação ${status}`,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * DELETE /api/requests/:id
 * Remove definitivamente a solicitação.
 */
export async function DELETE(_: any, { params }: any) {
  try {
    await db.query("DELETE FROM requests WHERE id = ?", [params.id]);

    return NextResponse.json({
      success: true,
      message: "Solicitação removida",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

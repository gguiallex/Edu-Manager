import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/subjects/:id
 * Retorna uma matéria específica
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const [rows]: any = await db.query(
      "SELECT * FROM subjects WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Matéria não encontrada" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * PUT /api/subjects/:id
 * Atualiza uma matéria
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name } = await request.json();

    console.log(`🔄 PUT /api/subjects/${id} →`, { name });

    await db.query(
      "UPDATE subjects SET name = ? WHERE id = ?",
      [name, id]
    );

    console.log("✅ Matéria atualizada");

    return NextResponse.json({
      success: true,
      message: "Matéria atualizada com sucesso",
    });
  } catch (err: any) {
    console.error("❌ Erro PUT subjects:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * DELETE /api/subjects/:id
 * Remove uma matéria
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    console.log(`🗑️ DELETE /api/subjects/${id}`);
    
    await db.query("DELETE FROM subjects WHERE id = ?", [id]);
    
    console.log("✅ Matéria deletada");

    return NextResponse.json({ message: "Matéria removida com sucesso" });
  } catch (err: any) {
    console.error("❌ Erro DELETE subjects:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
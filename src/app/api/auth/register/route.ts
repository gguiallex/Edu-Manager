import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, role } = await req.json();

    await db.query(
      "INSERT INTO requests (name, email, role) VALUES (?, ?, ?)",
      [name, email, role]
    );

    return NextResponse.json({ message: "Solicitação enviada!" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

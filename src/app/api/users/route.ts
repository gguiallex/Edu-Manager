import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query("SELECT * FROM users");
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();
  await db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
  return NextResponse.json({ message: "Usuário criado" });
}
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SHOW TABLES");
    return NextResponse.json({ success: true, tables: rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

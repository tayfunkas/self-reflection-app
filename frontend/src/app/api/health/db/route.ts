import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW() as now");

    return NextResponse.json({
      ok: true,
      dbTime: result.rows[0].now,
    });
  } catch (error) {
    console.error("DB connection error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Database connection failed",
      },
      { status: 500 }
    );
  }
}
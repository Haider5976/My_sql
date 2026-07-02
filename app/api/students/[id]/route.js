import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET single student
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const [rows] = await pool.query(
      "SELECT * FROM students WHERE Student_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
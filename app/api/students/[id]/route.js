import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

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

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await pool.query(
      "DELETE FROM students WHERE Student_id = ?", 
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Student deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const { Sname, email, phone, gender, address } = await request.json();

    const [result] = await pool.query(
      `UPDATE students
       SET Sname = ?, email = ?, phone = ?, gender = ?, address = ?
       WHERE Student_id = ?`,
      [Sname, email, phone, gender, address, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Student updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
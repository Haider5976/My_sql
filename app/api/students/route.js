import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all students
export async function GET() {
  try {
    const query = `SELECT * FROM students;`;
    const [rows] = await pool.execute(query);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// CREATE student
export async function POST(request) {
  try {
    const { Sname, email, phone, gender, address } = await request.json();

    await pool.query(
      `INSERT INTO students (Sname, email, phone, gender, address)
       VALUES (?, ?, ?, ?, ?)`,
      [Sname, email, phone, gender, address]
    );

    return NextResponse.json(
      { message: "Student created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }finally{console.log("Student created successfully");}
}
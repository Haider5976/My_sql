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
    if (!Sname || Sname.trim() === "" ) {
      return NextResponse.json(
        {massage:"Student name required"},
        {status:400}
      );
    }

    if (!email || email.trim() === "") {
      return NextResponse.json(
        {massage:"Email is requried"},
        {status:400}
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      return NextResponse.json (
        {massage:"Invaild email Format"},
        {status:400}
      );
    }
  
    const phoneRegex  =  /^[0-9]{11}$/;
    if(!phoneRegex.test(phone)) {
      return NextResponse.json (
        {massage:"Phone number must be 11 digit"},
        {status:400}
      );
    }

    if(!gender||gender.trim() ===""){
      return NextResponse.json(
        {massage:"Gender is required "},
        {status:400}
      );
    }

    if(!address||address.trim() ===""){
      return NextResponse.json(
        {massage:"Address is required"},
        {status:400}
      );
    }

   const [existingEmail] = await pool.query(
  "SELECT * FROM students WHERE email = ? AND Student_id != ?",
  [email, id]
);

 if (existingEmail.length>0){
  return NextResponse.json(
    {massage:"Email already exists"},
        {status:400}
  );
 }
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

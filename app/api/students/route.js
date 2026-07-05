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

    if(!Sname || Sname.trim() === ""){
      return NextResponse.json(
        {message:"Student name is required"},
        {status:400}
      );
    } 
    if (!email || email.trim() === "") {
       return NextResponse.json(
    { message: "Email is required" },
    { status: 400 }
  );
}

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return NextResponse.json(
    { message: "Invalid email format" },
    { status: 400 }
  );
}

const phoneRegex = /^[0-9]{11}$/;

if (!phoneRegex.test(phone)) {
  return NextResponse.json(
    { message: "Phone number must be 11 digits" },
    { status: 400 }
  );
}

// Gender Validation
if (!gender || gender.trim() === "") {
  return NextResponse.json(
    { message: "Gender is required" },
    { status: 400 }
  );
}

// Address Validation
if (!address || address.trim() === "") {
  return NextResponse.json(
    { message: "Address is required" },
    { status: 400 }
  );
}

// Check duplicate email
const [existingEmail] = await pool.query(
  "SELECT * FROM students WHERE email = ?",
  [email]
);

if (existingEmail.length > 0) {
  return NextResponse.json(
    { message: "Email already exists" },
    { status: 400 }
  );
}
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
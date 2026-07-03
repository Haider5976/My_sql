'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface StudentType {
  Student_id: number;
  Sname: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
}

export default function StudentList() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/students');

      if (!res.ok) {
        throw new Error('Failed to fetch students');
      }

      const data = await res.json();
      console.log('Students:', data);

      setStudents(Array.isArray(data) ? data : data.students ?? []);
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this student?'
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to delete student');
        return;
      }

      alert('Student deleted successfully!');

      setStudents((prev) =>
        prev.filter((student) => student.Student_id !== id)
      );
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Student List
          </h1>

          <Link
            href="/students"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Student
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500">
            No students found.
          </p>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.Student_id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                {/* Student Info */}
                <div>
                  <h2 className="font-semibold text-lg">
                    {student.Sname}
                  </h2>

                  <p className="text-gray-600">{student.email}</p>
                  <p className="text-gray-600">{student.phone}</p>
                  <p className="text-gray-600">{student.gender}</p>
                  <p className="text-gray-600">{student.address}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/students/edit/${student.Student_id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(student.Student_id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
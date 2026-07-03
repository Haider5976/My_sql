'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface StudentForm {
  Sname: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
}

export default function EditStudent() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [form, setForm] = useState<StudentForm>({
    Sname: '',
    email: '',
    phone: '',
    gender: '',
    address: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await fetch(`/api/students/${id}`);
      const data = await res.json();

      setForm({
        Sname: data.Sname || '',
        email: data.email || '',
        phone: data.phone || '',
        gender: data.gender || '',
        address: data.address || ''
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Student updated successfully");
        router.push('/students/list');
      } else {
        alert("Failed to update student");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-2">Edit Student</h2>

        <input
          type="text"
          name="Sname"
          placeholder="Enter student name"
          value={form.Sname}
          onChange={handlechange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter student email"
          value={form.email}
          onChange={handlechange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter student phone"
          value={form.phone}
          onChange={handlechange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="gender"
          placeholder="Enter student gender"
          value={form.gender}
          onChange={handlechange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="address"
          placeholder="Enter student address"
          value={form.address}
          onChange={handlechange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors"
        >
          Update Student
        </button>
      </form>
    </div>
  );
}
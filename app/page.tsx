'use client';

import React, { useState } from 'react';

export default function Student() {
  const [form, setForm] = useState({
    Sname: '',
    email: '',
    phone: '',
    gender: '',
    address: ''
  });

  const handlechange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Student added successfully");

        setForm({
          Sname: '',
          email: '',
          phone: '',
          gender: '',
          address: ''
        });
      } else {
        alert("Failed to add student");
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-2">Add Student</h2>

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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}
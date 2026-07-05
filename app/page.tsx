'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface StudentForm {
  Sname: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
}

export default function Student() {
  const router = useRouter();

  const [form, setForm] = useState<StudentForm>({
    Sname: '',
    email: '',
    phone: '',
    gender: '',
    address: ''
  });

  const [error, setError] = useState({
    Sname: '',
    email: '',
    phone: '',
    gender: '',
    address: ''
  });

  const handlechange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    // Remove error while typing/selecting
    setError({
      ...error,
      [e.target.name]: ''
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      Sname: '',
      email: '',
      phone: '',
      gender: '',
      address: ''
    };

    let isValid = true;

    if (!form.Sname.trim()) {
      newErrors.Sname = 'Student name is required';
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!/^[0-9]{11}$/.test(form.phone)) {
      newErrors.phone = 'Phone must be 11 digits';
      isValid = false;
    }

    if (!form.gender.trim()) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }

    if (!form.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    setError(newErrors);

    if (!isValid) return;

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        setForm({
          Sname: '',
          email: '',
          phone: '',
          gender: '',
          address: ''
        });

        router.push('/students/list');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
    <div
  className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/images/background.png')" }}
> 
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800">
          Add Student
        </h2>

        {/* Name */}
        <div>
          <input
            type="text"
            name="Sname"
            placeholder="Enter student name"
            value={form.Sname}
            onChange={handlechange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {error.Sname && (
            <p className="text-red-500 text-sm mt-1">
              {error.Sname}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter student email"
            value={form.email}
            onChange={handlechange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {error.email && (
            <p className="text-red-500 text-sm mt-1">
              {error.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Enter student phone"
            value={form.phone}
            onChange={handlechange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {error.phone && (
            <p className="text-red-500 text-sm mt-1">
              {error.phone}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <select
            name="gender"
            value={form.gender}
            onChange={handlechange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {error.gender && (
            <p className="text-red-500 text-sm mt-1">
              {error.gender}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <input
            type="text"
            name="address"
            placeholder="Enter student address"
            value={form.address}
            onChange={handlechange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          {error.address && (
            <p className="text-red-500 text-sm mt-1">
              {error.address}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Add Student
        </button>
      </form>

      <Link
  href="/students/list"
  className="text-blue-600 hover:underline"
>
  View Student List →
</Link>
    </div>
  );
}
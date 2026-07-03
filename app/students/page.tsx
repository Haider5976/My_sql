'use client';

import React, { useEffect, useState } from 'react';

type StudentForm = {
  Student_id?: number;
  Sname: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
};
export default function Student() {
  const [form, SetForm] = useState<StudentForm>({
    Sname: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
  });

  const [student, SetStudent] = useState<StudentForm[]>([]);
  const [loading, SetLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      SetLoading(true);
      const res = await fetch('/api/students');
      const data = await res.json();
      SetStudent(data);
    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        SetForm({
          Sname: '',
          email: '',
          phone: '',
          gender: '',
          address: '',
        });
        fetchStudents();
      } else {
        alert('Failed to add student.');
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="Sname"
          value={form.Sname}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit">Add Student</button>
      </form>

      <hr />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border={1} cellPadding={5} cellSpacing={0}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {student.map((s, index) => (
              <tr key={index}>
                <td>{s.Sname}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.gender}</td>
                <td>{s.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

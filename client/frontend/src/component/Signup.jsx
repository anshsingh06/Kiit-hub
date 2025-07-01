import React, { useState } from 'react';
import axios from 'axios';
import { CircleX } from 'lucide-react'; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    year: '',
    role:''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
     
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      {/* <button className='place-self-end cursor-pointer flex justify-between'><CircleX size={30}/></button> */}
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {message && <div className="mb-4 text-sm text-red-500">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="College Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="department"
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="year"
          type="text"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

  <div className="space-y-2">
  <label className="font-medium block">Select Role:</label>


  

  <label className="inline-flex items-center mr-4">
    <input
      type="radio"
      name="role"
      value="admin"
      checked={formData.role === 'admin'}
      onChange={handleChange}
      className="mr-2"
    />
    Admin
  </label>

  <label className="inline-flex items-center mr-4">
    <input
      type="radio"
      name="role"
      value="senior"
      checked={formData.role === 'senior'}
      onChange={handleChange}
      className="mr-2"
    />
    Senior(3rd,4th Yr)
  </label>

  <label className="inline-flex items-center">
    <input
      type="radio"
      name="role"
      value="student"
      checked={formData.role === 'student'}
      onChange={handleChange}
      className="mr-2"
    />
    Student
  </label>

  
</div>


        

    <button
    type="submit"
    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
    >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;

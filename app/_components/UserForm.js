'use client'
import { useState } from "react";

export default function UserForm() {
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      const res = await fetch('/api/nodemailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        console.log('success')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Your Name"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="useremail"
          placeholder="Your Email"
          value={formData.useremail}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
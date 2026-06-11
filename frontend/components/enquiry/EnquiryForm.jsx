"use client";

import { useState } from "react";
import axios from "axios";

const EnquiryForm = ({ propertyId }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Name and phone are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/enquiries`, {
        ...form,
        propertyId,
      });

      setSuccess("Enquiry submitted successfully!");
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mt-3">
      <h5>Enquire Now</h5>

      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="form-control mb-2"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="form-control mb-2"
          value={form.phone}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Message"
          className="form-control mb-2"
          value={form.message}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Submitting..." : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
